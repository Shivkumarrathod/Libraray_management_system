from app.cores.database import books_collection, transactions_collection
from app.schemas.search_schema import AdvancedSearchRequest
from fastapi import HTTPException, status
from bson import ObjectId
from typing import Optional

async def advanced_search(search_params: AdvancedSearchRequest):
    """Advanced search with multiple filters"""
    query = {}
    
    if search_params.title:
        query["title"] = {"$regex": search_params.title, "$options": "i"}
    
    if search_params.author:
        query["author"] = {"$regex": search_params.author, "$options": "i"}
    
    if search_params.category:
        query["category"] = search_params.category
    
    if search_params.isbn:
        query["isbn"] = search_params.isbn
    
    if search_params.publication_year_min or search_params.publication_year_max:
        year_query = {}
        if search_params.publication_year_min:
            year_query["$gte"] = search_params.publication_year_min
        if search_params.publication_year_max:
            year_query["$lte"] = search_params.publication_year_max
        query["publication_year"] = year_query
    
    if search_params.available_only:
        query["available_copies"] = {"$gt": 0}
    
    books = []
    cursor = books_collection.find(query)
    async for book in cursor:
        book["id"] = str(book.pop("_id"))
        books.append(book)
    
    return {
        "books": books,
        "total": len(books)
    }

async def get_suggestions(query: str, suggestion_type: str = "all"):
    """Get search suggestions based on partial input"""
    if len(query) < 2:
        return {"suggestions": [], "type": suggestion_type}
    
    suggestions = []
    
    if suggestion_type in ["all", "titles"]:
        # Get title suggestions
        titles = await books_collection.distinct("title", {
            "title": {"$regex": f"^{query}", "$options": "i"}
        })
        suggestions.extend(titles[:5])
    
    if suggestion_type in ["all", "authors"]:
        # Get author suggestions
        authors = await books_collection.distinct("author", {
            "author": {"$regex": f"^{query}", "$options": "i"}
        })
        suggestions.extend(authors[:5])
    
    if suggestion_type in ["all", "categories"]:
        # Get category suggestions
        categories = await books_collection.distinct("category", {
            "category": {"$regex": f"^{query}", "$options": "i"}
        })
        suggestions.extend(categories[:5])
    
    return {
        "suggestions": list(set(suggestions))[:10],  # Remove duplicates, limit to 10
        "type": suggestion_type
    }

async def get_ai_recommendations(member_id: str):
    """Get personalized book recommendations (rule-based)"""
    if not ObjectId.is_valid(member_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid member ID"
        )
    
    # Get member's borrowing history
    borrowed_books = []
    async for transaction in transactions_collection.find({"member_id": member_id}):
        book = await books_collection.find_one({"_id": ObjectId(transaction["book_id"])})
        if book:
            borrowed_books.append(book)
    
    if not borrowed_books:
        # No history, recommend popular books
        return await get_popular_books()
    
    # Get categories and authors from history
    categories = list(set([book["category"] for book in borrowed_books if "category" in book]))
    authors = list(set([book["author"] for book in borrowed_books if "author" in book]))
    
    # Find similar books
    query = {
        "$or": [
            {"category": {"$in": categories}},
            {"author": {"$in": authors}}
        ]
    }
    
    recommendations = []
    cursor = books_collection.find(query).limit(10)
    async for book in cursor:
        # Exclude already borrowed books
        if str(book["_id"]) not in [str(b["_id"]) for b in borrowed_books]:
            book["id"] = str(book.pop("_id"))
            recommendations.append(book)
    
    return {
        "recommendations": recommendations,
        "based_on": {
            "categories": categories,
            "authors": authors
        }
    }

async def semantic_search(query: str):
    """Semantic search (simplified text-based version)"""
    # In a full implementation, this would use vector embeddings
    # For now, we'll do a comprehensive text search
    
    search_query = {
        "$or": [
            {"title": {"$regex": query, "$options": "i"}},
            {"author": {"$regex": query, "$options": "i"}},
            {"description": {"$regex": query, "$options": "i"}},
            {"category": {"$regex": query, "$options": "i"}},
            {"publisher": {"$regex": query, "$options": "i"}}
        ]
    }
    
    books = []
    cursor = books_collection.find(search_query).limit(20)
    async for book in cursor:
        book["id"] = str(book.pop("_id"))
        
        # Calculate relevance score (simple version)
        score = 0
        if query.lower() in book.get("title", "").lower():
            score += 10
        if query.lower() in book.get("author", "").lower():
            score += 5
        if query.lower() in book.get("description", "").lower():
            score += 3
        
        book["relevance_score"] = score
        books.append(book)
    
    # Sort by relevance
    books.sort(key=lambda x: x["relevance_score"], reverse=True)
    
    return {
        "books": books,
        "query": query,
        "total": len(books)
    }

async def get_popular_books(limit: int = 10):
    """Get most borrowed books"""
    # Aggregate transactions to find most borrowed books
    pipeline = [
        {"$group": {"_id": "$book_id", "borrow_count": {"$sum": 1}}},
        {"$sort": {"borrow_count": -1}},
        {"$limit": limit}
    ]
    
    popular_book_ids = []
    async for result in transactions_collection.aggregate(pipeline):
        popular_book_ids.append(result["_id"])
    
    books = []
    for book_id in popular_book_ids:
        book = await books_collection.find_one({"_id": ObjectId(book_id)})
        if book:
            book["id"] = str(book.pop("_id"))
            books.append(book)
    
    return {
        "popular_books": books,
        "total": len(books)
    }
