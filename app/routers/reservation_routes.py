from fastapi import APIRouter, Depends, Query
from app.controllers.reservation_controller import (
    list_reservations, create_reservation, cancel_reservation, get_reservation_queue
)
from app.schemas.reservation_schema import ReservationCreate
from app.utils.auth import member_required, librarian_required
from typing import Optional

router = APIRouter(prefix="/reservations", tags=["Reservations"])

@router.get("/", dependencies=[Depends(librarian_required)])
async def fetch_reservations(
    member_id: Optional[str] = None,
    book_id: Optional[str] = None
):
    """List reservations (librarian/admin only)"""
    return await list_reservations(member_id, book_id)

@router.post("/", dependencies=[Depends(member_required)])
async def create_new_reservation(reservation: ReservationCreate):
    """Create a new reservation"""
    return await create_reservation(reservation)

@router.delete("/{reservation_id}", dependencies=[Depends(member_required)])
async def cancel_existing_reservation(reservation_id: str):
    """Cancel a reservation"""
    return await cancel_reservation(reservation_id)

@router.get("/queue/{book_id}")
async def get_queue(book_id: str):
    """Get reservation queue for a book"""
    return await get_reservation_queue(book_id)
