from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FineResponse(BaseModel):
    id: str
    transaction_id: str
    member_id: str
    amount: float
    reason: str
    status: str  # pending, paid, waived
    created_at: datetime
    paid_at: Optional[datetime]

class PayFineRequest(BaseModel):
    payment_method: str = "cash"  # cash, card, online
    payment_reference: Optional[str] = None

class WaiveFineRequest(BaseModel):
    reason: str

class FineSummary(BaseModel):
    total_fines: int
    total_amount: float
    pending_amount: float
    paid_amount: float
    waived_amount: float
