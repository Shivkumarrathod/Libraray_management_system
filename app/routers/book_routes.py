from fastapi import APIRouter, Query, Depends, File, UploadFile, Form
from app.controllers.book_controller import (
    add_book, get_books, get_book_by_id, update_book, delete_book,
    get_categories, get_authors, check_availability, upload_book_with_image
)
from app.schemas.book_schema import BookCreate, BookUpdate
from app.utils.auth import librarian_required, get_current_user
from typing import Optional

router = APIRouter(prefix="/books", tags=["Books"])

@router.get("/")
async def list_books(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    author: Optional[str] = None,
    search: Optional[str] = None
):
    """List all books with pagination and filters"""
    return await get_books(page, page_size, category, author, search)

@router.get("/categories")
async def fetch_categories():
    """Get all book categories"""
    return await get_categories()

@router.get("/authors")
async def fetch_authors():
    """Get all authors"""
    return await get_authors()

@router.get("/{book_id}")
async def get_book(book_id: str):
    """Get a single book by ID"""
    return await get_book_by_id(book_id)

@router.get("/{book_id}/availability")
async def get_availability(book_id: str):
    """Check book availability"""
    return await check_availability(book_id)

@router.post("/", dependencies=[Depends(librarian_required)])
async def create_book(book: BookCreate):
    """Add a new book (librarian/admin only)"""
    return await add_book(book)

@router.post("/upload", dependencies=[Depends(librarian_required)])
async def upload_book(
    title: str = Form(...),
    author: str = Form(...),
    isbn: str = Form(...),
    category: str = Form(...),
    total_copies: int = Form(...),
    cover_image: UploadFile = File(None),
    publisher: Optional[str] = Form(None),
    publication_year: Optional[int] = Form(None),
    description: Optional[str] = Form(None)
):
    """Upload book with cover image using form data (librarian/admin only)"""
    return await upload_book_with_image(
        title, author, isbn, category, total_copies,
        cover_image, publisher, publication_year, description
    )

@router.put("/{book_id}", dependencies=[Depends(librarian_required)])
async def modify_book(book_id: str, book: BookUpdate):
    """Update book details (librarian/admin only)"""
    return await update_book(book_id, book)

@router.delete("/{book_id}", dependencies=[Depends(librarian_required)])
async def remove_book(book_id: str):
    """Delete a book (librarian/admin only)"""
    return await delete_book(book_id)

