from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from .base import BaseModel

class Chat(BaseModel):
    __tablename__ = "chats"

    # Foreign keys
    buyer_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    seller_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=True)
    
    # Relationships
    buyer = relationship("User", foreign_keys=[buyer_id])
    seller = relationship("User", foreign_keys=[seller_id])
    product = relationship("Product")
    messages = relationship("Message", back_populates="chat")
    
    def __repr__(self):
        return f"<Chat {self.id}>"

class Message(BaseModel):
    __tablename__ = "messages"

    content = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    
    # Foreign keys
    chat_id = Column(Integer, ForeignKey('chats.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    # Relationships
    chat = relationship("Chat", back_populates="messages")
    user = relationship("User", back_populates="messages")
    
    def __repr__(self):
        return f"<Message {self.id}>" 