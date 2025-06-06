from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from app.models.order import OrderStatus
from .product import Product

class OrderItemBase(BaseModel):
    quantity: int
    price: float

class OrderItemCreate(OrderItemBase):
    product_id: int

class OrderItem(OrderItemBase):
    id: int
    order_id: int
    product: Product
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    shipping_address: str
    notes: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    tracking_number: Optional[str] = None

class Order(OrderBase):
    id: int
    buyer_id: int
    status: OrderStatus
    total_amount: float
    tracking_number: Optional[str]
    created_at: datetime
    updated_at: datetime
    items: List[OrderItem]

    class Config:
        from_attributes = True

class OrderFilter(BaseModel):
    status: Optional[OrderStatus] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    page: int = 1
    per_page: int = 20 