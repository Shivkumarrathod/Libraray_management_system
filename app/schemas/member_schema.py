from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class MemberCreate(BaseModel):
    user_id: str  # Reference to users collection
    phone: str
    address: str
    membership_type: str = "standard"  # standard or premium

class MemberUpdate(BaseModel):
    phone: Optional[str] = None
    address: Optional[str] = None
    membership_type: Optional[str] = None
    max_books_allowed: Optional[int] = None
    is_active: Optional[bool] = None

class MemberResponse(BaseModel):
    id: str
    user_id: str
    membership_id: str
    phone: str
    address: str
    membership_type: str
    membership_start: datetime
    membership_end: datetime
    max_books_allowed: int
    is_active: bool
    user_details: Optional[dict] = None  # Populated with user info

class MemberSearch(BaseModel):
    query: str
    page: int = 1
    page_size: int = 20
