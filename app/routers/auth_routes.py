from fastapi import APIRouter, Depends
from app.controllers.auth_controller import (
    register_user, login_user, logout_user, 
    forgot_password, reset_password, get_user_roles
)
from app.schemas.auth_schema import (
    UserRegister, UserLogin, Token, 
    ForgotPassword, ResetPassword, RoleResponse
)
from app.utils.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", status_code=201)
async def register(user: UserRegister):
    """Register a new user"""
    return await register_user(user)

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login and receive JWT token"""
    return await login_user(credentials)

@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """Logout current user"""
    return await logout_user()

@router.post("/forgot-password")
async def forgot_password_request(data: ForgotPassword):
    """Request password reset"""
    return await forgot_password(data.email)

@router.post("/reset-password")
async def reset_password_request(data: ResetPassword):
    """Reset password with token"""
    return await reset_password(data.token, data.new_password)

@router.get("/roles", response_model=RoleResponse)
async def get_roles():
    """Get available user roles"""
    return await get_user_roles()
