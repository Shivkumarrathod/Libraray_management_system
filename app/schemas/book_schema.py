from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class BookCreate(BaseModel):
    title: str
    author: str
    isbn: str
    category: str
    publisher: Optional[str] = None
    publication_year: Optional[int] = None
    total_copies: int = 1
    description: Optional[str] = None
    cover_image: Optional[str] = None

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    isbn: Optional[str] = None
    category: Optional[str] = None
    publisher: Optional[str] = None
    publication_year: Optional[int] = None
    total_copies: Optional[int] = None
    available_copies: Optional[int] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None

class BookResponse(BaseModel):
    id: str
    title: str
    author: str
    isbn: str
    category: str
    publisher: Optional[str]
    publication_year: Optional[int]
    total_copies: int
    available_copies: int
    description: Optional[str]
    cover_image: Optional[str]
    created_at: datetime

class BookFilter(BaseModel):
    category: Optional[str] = None
    author: Optional[str] = None
    search: Optional[str] = None
    page: int = 1
    page_size: int = 20

class CategoryResponse(BaseModel):
    categories: list[str]

class AuthorResponse(BaseModel):
    authors: list[str]

class AvailabilityResponse(BaseModel):
    book_id: str
    title: str
    total_copies: int
    available_copies: int
    is_available: bool

