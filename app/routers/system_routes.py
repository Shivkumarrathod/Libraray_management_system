from fastapi import APIRouter, Depends
from app.controllers.system_controller import (
    get_settings, update_settings, health_check, list_staff, add_staff
)
from app.schemas.system_schema import SettingUpdate, StaffCreate
from app.utils.auth import admin_required, librarian_required

router = APIRouter(prefix="/system", tags=["System"])

@router.get("/settings", dependencies=[Depends(admin_required)])
async def fetch_settings():
    """Get all system settings (admin only)"""
    return await get_settings()

@router.put("/settings", dependencies=[Depends(admin_required)])
async def modify_settings(setting: SettingUpdate):
    """Update system settings (admin only)"""
    return await update_settings(setting)

@router.get("/health")
async def check_health():
    """Check system health and database connectivity"""
    return await health_check()

@router.get("/staff", dependencies=[Depends(admin_required)])
async def fetch_staff():
    """List all staff members (admin only)"""
    return await list_staff()

@router.post("/staff", dependencies=[Depends(admin_required)])
async def create_staff(staff: StaffCreate):
    """Add a new staff member (admin only)"""
    return await add_staff(staff)
