from sqlalchemy import Column, String, Boolean, Enum
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel

class UserRole(str, enum.Enum):
    GUEST = "guest"
    BUYER = "buyer"
    SELLER = "seller"
    ADMIN = "admin"

class User(BaseModel):
    __tablename__ = "users"

    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    phone = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(Enum(UserRole), default=UserRole.BUYER)
    
    # Seller specific fields
    company_name = Column(String, nullable=True)
    company_description = Column(String, nullable=True)
    company_address = Column(String, nullable=True)
    company_phone = Column(String, nullable=True)
    is_verified = Column(Boolean, default=False)
    
    # Relationships
    products = relationship("Product", back_populates="seller")
    orders = relationship("Order", back_populates="buyer")
    reviews = relationship("Review", back_populates="user")
    messages = relationship("Message", back_populates="user")
    
    def __repr__(self):
        return f"<User {self.email}>" 