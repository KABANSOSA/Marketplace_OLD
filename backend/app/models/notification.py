from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.db.base_class import Base

class NotificationType(str, enum.Enum):
    ORDER_RECEIVED = "order_received"
    ORDER_STATUS_CHANGED = "order_status_changed"
    NEW_REVIEW = "new_review"
    LOW_STOCK = "low_stock"
    SYSTEM = "system"

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(Enum(NotificationType), nullable=False)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    data = Column(String, nullable=True)  # JSON string for additional data

    # Relationships
    user = relationship("User", back_populates="notifications")

    def __repr__(self):
        return f"<Notification {self.id}>" 