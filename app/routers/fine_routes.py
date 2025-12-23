from fastapi import APIRouter, Query, Depends
from app.controllers.fine_controller import list_fines, pay_fine, waive_fine, get_fine_summary
from app.schemas.fine_schema import PayFineRequest, WaiveFineRequest
from app.utils.auth import admin_required, librarian_required, member_required
from typing import Optional

router = APIRouter(prefix="/fines", tags=["Fines"])

@router.get("/", dependencies=[Depends(librarian_required)])
async def fetch_fines(
    member_id: Optional[str] = None,
    status: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    """List fines with filters (librarian/admin only)"""
    return await list_fines(member_id, status, page, page_size)

@router.post("/{fine_id}/pay", dependencies=[Depends(member_required)])
async def pay_fine_endpoint(fine_id: str, payment_data: PayFineRequest):
    """Pay a fine"""
    return await pay_fine(fine_id, payment_data)

@router.post("/{fine_id}/waive", dependencies=[Depends(admin_required)])
async def waive_fine_endpoint(fine_id: str, waive_data: WaiveFineRequest):
    """Waive a fine (admin only)"""
    return await waive_fine(fine_id, waive_data)

@router.get("/summary", dependencies=[Depends(librarian_required)])
async def get_summary(member_id: Optional[str] = None):
    """Get fine summary statistics"""
    return await get_fine_summary(member_id)
