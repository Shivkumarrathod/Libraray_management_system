from fastapi import APIRouter, Query, Depends
from app.controllers.transaction_controller import (
    borrow_book, return_book, get_transaction_history,
    get_overdue_transactions, search_available_books, check_member_eligibility
)
from app.schemas.transaction_schema import BorrowRequest, ReturnRequest
from app.utils.auth import librarian_required, member_required
from typing import Optional

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/borrow", dependencies=[Depends(librarian_required)])
async def borrow(borrow_data: BorrowRequest):
    """Borrow a book (librarian/admin only)"""
    return await borrow_book(borrow_data)

@router.post("/return", dependencies=[Depends(librarian_required)])
async def return_borrowed_book(return_data: ReturnRequest):
    """Return a borrowed book (librarian/admin only)"""
    return await return_book(return_data)

@router.get("/history", dependencies=[Depends(member_required)])
async def get_history(
    member_id: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    """Get transaction history"""
    return await get_transaction_history(member_id, page, page_size)

@router.get("/overdue", dependencies=[Depends(librarian_required)])
async def get_overdue():
    """Get all overdue transactions (librarian/admin only)"""
    return await get_overdue_transactions()

@router.get("/available-books")
async def get_available_books(
    search: Optional[str] = None,
    category: Optional[str] = None
):
    """Search available books for borrowing"""
    return await search_available_books(search, category)

@router.get("/eligibility/{member_id}", dependencies=[Depends(librarian_required)])
async def get_eligibility(member_id: str):
    """Check if member is eligible to borrow books (librarian/admin only)"""
    return await check_member_eligibility(member_id)
