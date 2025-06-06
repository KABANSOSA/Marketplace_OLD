from sqlalchemy import Column, String, Float, Integer, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class Order(BaseModel):
    __tablename__ = "orders"

    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    total_amount = Column(Float, nullable=False)
    shipping_address = Column(Text, nullable=False)
    tracking_number = Column(String)
    notes = Column(Text)
    
    # Foreign keys
    buyer_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    # Relationships
    buyer = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")
    
    def __repr__(self):
        return f"<Order {self.id}>"

class OrderItem(BaseModel):
    __tablename__ = "order_items"

    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)  # Price at the time of order
    
    # Foreign keys
    order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    
    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
    
    def __repr__(self):
        return f"<OrderItem {self.id}>"

class Review(BaseModel):
    __tablename__ = "reviews"

    rating = Column(Integer, nullable=False)  # 1-5 stars
    comment = Column(Text)
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="reviews")
    product = relationship("Product", back_populates="reviews")
    
    def __repr__(self):
        return f"<Review {self.id}>" 