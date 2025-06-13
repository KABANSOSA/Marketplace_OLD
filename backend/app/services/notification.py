from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from app.models.notification import Notification, NotificationType
from app.models.user import User
from app.schemas.notification import NotificationCreate

def create_notification(
    db: Session,
    *,
    user_id: int,
    type: NotificationType,
    title: str,
    message: str,
    data: Optional[Dict[str, Any]] = None
) -> Notification:
    """
    Create a new notification.
    """
    notification = Notification(
        user_id=user_id,
        type=type,
        title=title,
        message=message,
        data=data
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

def create_order_notification(
    db: Session,
    *,
    user: User,
    order_id: int,
    order_number: str
) -> Notification:
    """
    Create notification for new order.
    """
    return create_notification(
        db=db,
        user_id=user.id,
        type=NotificationType.ORDER_RECEIVED,
        title="Новый заказ",
        message=f"Получен новый заказ #{order_number}",
        data={"order_id": order_id}
    )

def create_order_status_notification(
    db: Session,
    *,
    user: User,
    order_id: int,
    order_number: str,
    status: str
) -> Notification:
    """
    Create notification for order status change.
    """
    return create_notification(
        db=db,
        user_id=user.id,
        type=NotificationType.ORDER_STATUS_CHANGED,
        title="Статус заказа изменен",
        message=f"Статус заказа #{order_number} изменен на {status}",
        data={"order_id": order_id, "status": status}
    )

def create_review_notification(
    db: Session,
    *,
    user: User,
    product_id: int,
    product_name: str,
    rating: int
) -> Notification:
    """
    Create notification for new review.
    """
    return create_notification(
        db=db,
        user_id=user.id,
        type=NotificationType.NEW_REVIEW,
        title="Новый отзыв",
        message=f"Получен новый отзыв на товар {product_name} с оценкой {rating}",
        data={"product_id": product_id, "rating": rating}
    )

def create_low_stock_notification(
    db: Session,
    *,
    user: User,
    product_id: int,
    product_name: str,
    current_stock: int
) -> Notification:
    """
    Create notification for low stock.
    """
    return create_notification(
        db=db,
        user_id=user.id,
        type=NotificationType.LOW_STOCK,
        title="Низкий запас",
        message=f"У товара {product_name} осталось {current_stock} единиц",
        data={"product_id": product_id, "current_stock": current_stock}
    )

def create_system_notification(
    db: Session,
    *,
    user: User,
    title: str,
    message: str,
    data: Optional[Dict[str, Any]] = None
) -> Notification:
    """
    Create system notification.
    """
    return create_notification(
        db=db,
        user_id=user.id,
        type=NotificationType.SYSTEM,
        title=title,
        message=message,
        data=data
    ) 