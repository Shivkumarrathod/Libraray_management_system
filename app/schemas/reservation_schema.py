from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReservationCreate(BaseModel):
    member_id: str
    book_id: str

class ReservationResponse(BaseModel):
    id: str
    member_id: str
    book_id: str
    reservation_date: datetime
    status: str  # active, fulfilled, cancelled
    queue_position: int
    expiry_date: datetime
