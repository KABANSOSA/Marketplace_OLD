from typing import Optional
from pydantic import BaseModel, EmailStr
from app.models.user import UserRole

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.BUYER

class UserUpdate(UserBase):
    password: Optional[str] = None

class SellerCreate(UserCreate):
    company_name: str
    company_description: Optional[str] = None
    company_address: Optional[str] = None
    company_phone: Optional[str] = None

class UserInDBBase(UserBase):
    id: int
    is_active: bool
    role: UserRole

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[int] = None 