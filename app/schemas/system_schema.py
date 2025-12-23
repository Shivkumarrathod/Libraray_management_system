from pydantic import BaseModel, EmailStr
from typing import Optional

class SettingUpdate(BaseModel):
    key: str
    value: str
    description: Optional[str] = None

class StaffCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str  # admin or librarian
