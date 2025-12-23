from fastapi import APIRouter, Query, Depends
from app.controllers.member_controller import (
    list_members, add_member, update_member,
    search_members, get_member_profile, get_borrowing_history
)
from app.schemas.member_schema import MemberCreate, MemberUpdate
from app.utils.auth import librarian_required, get_current_user
from typing import Optional

router = APIRouter(prefix="/members", tags=["Members"])

@router.get("/", dependencies=[Depends(librarian_required)])
async def fetch_members(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    """List all members (librarian/admin only)"""
    return await list_members(page, page_size)

@router.post("/", dependencies=[Depends(librarian_required)])
async def create_member(member: MemberCreate):
    """Add a new member (librarian/admin only)"""
    return await add_member(member)

@router.put("/{member_id}", dependencies=[Depends(librarian_required)])
async def modify_member(member_id: str, member: MemberUpdate):
    """Update member details (librarian/admin only)"""
    return await update_member(member_id, member)

@router.get("/search", dependencies=[Depends(librarian_required)])
async def search_member(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    """Search members by name, email, or membership ID (librarian/admin only)"""
    return await search_members(q, page, page_size)

@router.get("/{member_id}/profile")
async def get_profile(
    member_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get member profile (authenticated users)"""
    return await get_member_profile(member_id)

@router.get("/{member_id}/history")
async def get_history(
    member_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get member's borrowing history (authenticated users)"""
    return await get_borrowing_history(member_id)
