from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EBookResponse(BaseModel):
    id: str
    title: str
    author: str
    file_id: str
    format: str  # pdf, epub, mobi
    size_mb: float
    category: str
    upload_date: datetime

class BookmarkCreate(BaseModel):
    ebook_id: str
    page_number: int
