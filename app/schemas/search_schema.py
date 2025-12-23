from pydantic import BaseModel
from typing import Optional, List

class AdvancedSearchRequest(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    isbn: Optional[str] = None
    publication_year_min: Optional[int] = None
    publication_year_max: Optional[int] = None
    available_only: bool = False

class SearchSuggestion(BaseModel):
    suggestions: List[str]
    type: str  # book_titles, authors, categories
