from app.cores.database import books_collection, transactions_collection, members_collection
from app.schemas.ai_schema import ChatRequest, QueryRequest
from datetime import datetime
import uuid

# Simple in-memory conversation storage (use Redis in production)
conversations = {}

async def chat_assistant(chat_data: ChatRequest):
    """Simple rule-based chat assistant for library queries"""
    message = chat_data.message.lower()
    conversation_id = chat_data.conversation_id or str(uuid.uuid4())
    
    # Simple keyword-based responses
    if "hours" in message or "open" in message:
        response = "The library is open Monday-Friday: 9 AM - 8 PM, Saturday-Sunday: 10 AM - 6 PM."
    elif "borrow" in message or "checkout" in message:
        response = "You can borrow up to 5 books for 14 days. Premium members can borrow up to 10 books."
    elif "fine" in message or "late" in message:
        response = f"Late fees are $5.00 per day. Please return books on time to avoid fines."
    elif "renew" in message:
        response = "You can renew books online or at the library desk, provided there are no reservations."
    elif "membership" in message:
        response = "We offer Standard and Premium memberships. Visit our desk to sign up!"
    elif "search" in message or "find" in message:
        response = "You can search for books using our advanced search feature. Try searching by title, author, or category."
    else:
        response = "I'm here to help! You can ask me about library hours, borrowing policies, fines, renewals, or how to search for books."
    
    # Store conversation
    if conversation_id not in conversations:
        conversations[conversation_id] = []
    conversations[conversation_id].append({
        "user": chat_data.message,
        "assistant": response,
        "timestamp": datetime.utcnow()
    })
    
    return {
        "response": response,
        "conversation_id": conversation_id
    }

async def query_data(query_data: QueryRequest):
    """Natural language query to database (simplified)"""
    query = query_data.query.lower()
    
    # Simple keyword-based queries
    if "how many books" in query:
        total_books = await books_collection.count_documents({})
        return {
            "query": query_data.query,
            "result": f"There are {total_books} books in the library.",
            "data": {"total_books": total_books}
        }
    
    elif "available books" in query:
        available = await books_collection.count_documents({"available_copies": {"$gt": 0}})
        return {
            "query": query_data.query,
            "result": f"There are {available} books currently available.",
            "data": {"available_books": available}
        }
    
    elif "overdue" in query:
        overdue = await transactions_collection.count_documents({
            "status": "borrowed",
            "due_date": {"$lt": datetime.utcnow()}
        })
        return {
            "query": query_data.query,
            "result": f"There are {overdue} overdue transactions.",
            "data": {"overdue_count": overdue}
        }
    
    elif "members" in query:
        total_members = await members_collection.count_documents({})
        return {
            "query": query_data.query,
            "result": f"There are {total_members} registered members.",
            "data": {"total_members": total_members}
        }
    
    else:
        return {
            "query": query_data.query,
            "result": "I couldn't understand that query. Try asking about books, members, or overdue items.",
            "data": {}
        }

async def get_analytics():
    """Get AI-powered analytics insights"""
    # Gather statistics
    total_books = await books_collection.count_documents({})
    available_books = await books_collection.count_documents({"available_copies": {"$gt": 0}})
    total_transactions = await transactions_collection.count_documents({})
    active_borrows = await transactions_collection.count_documents({"status": "borrowed"})
    total_members = await members_collection.count_documents({})
    
    # Calculate utilization rate
    utilization_rate = (active_borrows / total_books * 100) if total_books > 0 else 0
    
    # Get most popular category
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 1}
    ]
    
    most_popular_category = "N/A"
    async for result in books_collection.aggregate(pipeline):
        most_popular_category = result["_id"]
    
    # Generate insights
    insights = []
    
    if utilization_rate > 70:
        insights.append("High book utilization! Consider expanding the collection.")
    elif utilization_rate < 30:
        insights.append("Low book utilization. Consider marketing campaigns to increase borrowing.")
    
    if available_books < total_books * 0.2:
        insights.append("Low book availability. Many books are currently borrowed.")
    
    return {
        "analytics": {
            "total_books": total_books,
            "available_books": available_books,
            "utilization_rate": round(utilization_rate, 2),
            "total_transactions": total_transactions,
            "active_borrows": active_borrows,
            "total_members": total_members,
            "most_popular_category": most_popular_category
        },
        "insights": insights,
        "generated_at": datetime.utcnow()
    }
