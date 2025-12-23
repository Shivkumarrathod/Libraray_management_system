from app.cores.database import system_settings_collection, users_collection, db
from app.schemas.system_schema import SettingUpdate, StaffCreate
from app.utils.utils import hash_password
from fastapi import HTTPException, status
from bson import ObjectId
from datetime import datetime

async def get_settings():
    """Get all system settings"""
    settings = []
    async for setting in system_settings_collection.find():
        setting["id"] = str(setting.pop("_id"))
        settings.append(setting)
    
    return {
        "settings": settings,
        "total": len(settings)
    }

async def update_settings(setting_data: SettingUpdate):
    """Update or create a system setting"""
    existing = await system_settings_collection.find_one({"key": setting_data.key})
    
    if existing:
        # Update existing setting
        await system_settings_collection.update_one(
            {"key": setting_data.key},
            {"$set": {
                "value": setting_data.value,
                "description": setting_data.description,
                "updated_at": datetime.utcnow()
            }}
        )
    else:
        # Create new setting
        setting_doc = {
            "key": setting_data.key,
            "value": setting_data.value,
            "description": setting_data.description,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        await system_settings_collection.insert_one(setting_doc)
    
    return {
        "message": "Setting updated successfully",
        "key": setting_data.key
    }

async def health_check():
    """Check system health and database connectivity"""
    try:
        # Check database connection
        await db.command("ping")
        db_status = "healthy"
    except Exception as e:
        db_status = "unhealthy"
    
    # Get collection counts
    collections_status = {}
    try:
        collections_status["users"] = await users_collection.count_documents({})
        collections_status["books"] = await db["books"].count_documents({})
        collections_status["transactions"] = await db["transactions"].count_documents({})
    except Exception:
        collections_status = {"error": "Unable to fetch counts"}
    
    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "database": db_status,
        "collections": collections_status,
        "timestamp": datetime.utcnow()
    }

async def list_staff():
    """List all staff members (admin and librarian)"""
    staff = []
    cursor = users_collection.find({"role": {"$in": ["admin", "librarian"]}})
    async for user in cursor:
        user["id"] = str(user.pop("_id"))
        user.pop("password_hash", None)  # Don't expose password hash
        staff.append(user)
    
    return {
        "staff": staff,
        "total": len(staff)
    }

async def add_staff(staff_data: StaffCreate):
    """Add a new staff member"""
    # Validate role
    if staff_data.role not in ["admin", "librarian"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be 'admin' or 'librarian'"
        )
    
    # Check if email already exists
    existing = await users_collection.find_one({"email": staff_data.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create staff user
    user_doc = {
        "email": staff_data.email,
        "password_hash": hash_password(staff_data.password),
        "full_name": staff_data.full_name,
        "role": staff_data.role,
        "is_active": True,
        "created_at": datetime.utcnow()
    }
    
    result = await users_collection.insert_one(user_doc)
    
    return {
        "message": "Staff member added successfully",
        "user_id": str(result.inserted_id),
        "role": staff_data.role
    }
