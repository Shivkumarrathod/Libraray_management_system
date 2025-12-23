from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BorrowRequest(BaseModel):
    member_id: str
    book_id: str

class ReturnRequest(BaseModel):
    transaction_id: str

class TransactionResponse(BaseModel):
    id: str
    member_id: str
    book_id: str
    borrow_date: datetime
    due_date: datetime
    return_date: Optional[datetime]
    status: str  # borrowed, returned, overdue
    fine_amount: float

class EligibilityResponse(BaseModel):
    member_id: str
    is_eligible: bool
    reason: Optional[str]
    current_books_borrowed: int
    max_books_allowed: int
    pending_fines: float
