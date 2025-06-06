from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from .user import User
from .product import Product

class MessageBase(BaseModel):
    content: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: int
    chat_id: int
    user_id: int
    is_read: bool
    created_at: datetime
    updated_at: datetime
    user: User

    class Config:
        from_attributes = True

class ChatBase(BaseModel):
    product_id: Optional[int] = None

class ChatCreate(ChatBase):
    seller_id: int

class Chat(ChatBase):
    id: int
    buyer_id: int
    seller_id: int
    created_at: datetime
    updated_at: datetime
    messages: List[Message]
    buyer: User
    seller: User
    product: Optional[Product]

    class Config:
        from_attributes = True

class ChatFilter(BaseModel):
    product_id: Optional[int] = None
    page: int = 1
    per_page: int = 20 