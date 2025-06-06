from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_active_user
from app.models.user import User
from app.models.order import Order, OrderItem, OrderStatus
from app.models.product import Product
from app.schemas.order import (
    Order as OrderSchema,
    OrderCreate,
    OrderUpdate,
    OrderFilter,
)

router = APIRouter()

@router.get("/", response_model=List[OrderSchema])
def list_orders(
    *,
    db: Session = Depends(get_db),
    filter: OrderFilter = Depends(),
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve orders with filtering and pagination.
    """
    query = db.query(Order).filter(Order.buyer_id == current_user.id)
    
    if filter.status:
        query = query.filter(Order.status == filter.status)
    if filter.start_date:
        query = query.filter(Order.created_at >= filter.start_date)
    if filter.end_date:
        query = query.filter(Order.created_at <= filter.end_date)
    
    # Apply pagination
    total = query.count()
    orders = query.offset((filter.page - 1) * filter.per_page).limit(filter.per_page).all()
    
    return orders

@router.post("/", response_model=OrderSchema)
def create_order(
    *,
    db: Session = Depends(get_db),
    order_in: OrderCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new order.
    """
    # Calculate total amount and validate products
    total_amount = 0
    order_items = []
    
    for item in order_in.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Not enough stock for product {product.name}"
            )
        
        total_amount += product.price * item.quantity
        order_items.append(
            OrderItem(
                product_id=product.id,
                quantity=item.quantity,
                price=product.price
            )
        )
    
    # Create order
    order = Order(
        buyer_id=current_user.id,
        total_amount=total_amount,
        shipping_address=order_in.shipping_address,
        notes=order_in.notes,
        items=order_items
    )
    
    # Update product stock
    for item in order_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        product.stock -= item.quantity
    
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.get("/{order_id}", response_model=OrderSchema)
def get_order(
    *,
    db: Session = Depends(get_db),
    order_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get order by ID.
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.buyer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return order

@router.put("/{order_id}", response_model=OrderSchema)
def update_order(
    *,
    db: Session = Depends(get_db),
    order_id: int,
    order_in: OrderUpdate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Update order status.
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.buyer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Only allow status updates
    if order_in.status:
        order.status = order_in.status
    if order_in.tracking_number:
        order.tracking_number = order_in.tracking_number
    
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.post("/{order_id}/cancel")
def cancel_order(
    *,
    db: Session = Depends(get_db),
    order_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Cancel order.
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.buyer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    if order.status != OrderStatus.PENDING:
        raise HTTPException(status_code=400, detail="Can only cancel pending orders")
    
    # Restore product stock
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        product.stock += item.quantity
    
    order.status = OrderStatus.CANCELLED
    db.add(order)
    db.commit()
    return {"status": "success"} 