from typing import Any
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from app.api.deps import get_db, get_current_active_seller
from app.models.user import User
from app.models.order import Order, OrderStatus
from app.models.product import Product, Category
from app.models.order_item import OrderItem

router = APIRouter()

@router.get("/sellers/{seller_id}/analytics")
def get_seller_analytics(
    *,
    db: Session = Depends(get_db),
    seller_id: int,
    time_range: str = Query("week", enum=["week", "month", "year"]),
    current_user: User = Depends(get_current_active_seller),
) -> Any:
    """
    Get seller analytics data.
    """
    if current_user.id != seller_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    # Calculate date range
    end_date = datetime.utcnow()
    if time_range == "week":
        start_date = end_date - timedelta(days=7)
    elif time_range == "month":
        start_date = end_date - timedelta(days=30)
    else:  # year
        start_date = end_date - timedelta(days=365)

    # Get sales data
    sales_data = db.query(
        func.date(Order.created_at).label('date'),
        func.sum(OrderItem.price * OrderItem.quantity).label('amount'),
        func.count(Order.id).label('orders')
    ).join(
        OrderItem, Order.id == OrderItem.order_id
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.created_at <= end_date,
            OrderItem.product_id.in_(
                db.query(Product.id).filter(Product.seller_id == seller_id)
            )
        )
    ).group_by(
        func.date(Order.created_at)
    ).all()

    # Get products by category
    products_by_category = db.query(
        Category.name.label('category'),
        func.count(Product.id).label('count')
    ).join(
        Product.categories
    ).filter(
        Product.seller_id == seller_id
    ).group_by(
        Category.name
    ).all()

    # Calculate revenue metrics
    total_revenue = db.query(
        func.sum(OrderItem.price * OrderItem.quantity)
    ).join(
        Order, Order.id == OrderItem.order_id
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.created_at <= end_date,
            OrderItem.product_id.in_(
                db.query(Product.id).filter(Product.seller_id == seller_id)
            )
        )
    ).scalar() or 0

    # Calculate previous period revenue for growth
    prev_start_date = start_date - (end_date - start_date)
    prev_revenue = db.query(
        func.sum(OrderItem.price * OrderItem.quantity)
    ).join(
        Order, Order.id == OrderItem.order_id
    ).filter(
        and_(
            Order.created_at >= prev_start_date,
            Order.created_at < start_date,
            OrderItem.product_id.in_(
                db.query(Product.id).filter(Product.seller_id == seller_id)
            )
        )
    ).scalar() or 0

    revenue_growth = (
        ((total_revenue - prev_revenue) / prev_revenue * 100)
        if prev_revenue > 0 else 0
    )

    # Calculate average order value
    total_orders = db.query(
        func.count(Order.id)
    ).join(
        OrderItem, Order.id == OrderItem.order_id
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.created_at <= end_date,
            OrderItem.product_id.in_(
                db.query(Product.id).filter(Product.seller_id == seller_id)
            )
        )
    ).scalar() or 0

    average_order_value = total_revenue / total_orders if total_orders > 0 else 0

    # Get order statistics
    orders = db.query(
        func.count(Order.id).label('total'),
        func.sum(case((Order.status == OrderStatus.PENDING, 1), else_=0)).label('pending'),
        func.sum(case((Order.status == OrderStatus.COMPLETED, 1), else_=0)).label('completed'),
        func.sum(case((Order.status == OrderStatus.CANCELLED, 1), else_=0)).label('cancelled')
    ).join(
        OrderItem, Order.id == OrderItem.order_id
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.created_at <= end_date,
            OrderItem.product_id.in_(
                db.query(Product.id).filter(Product.seller_id == seller_id)
            )
        )
    ).first()

    # Get top selling products
    top_products = db.query(
        Product.name,
        func.sum(OrderItem.quantity).label('sales'),
        func.sum(OrderItem.price * OrderItem.quantity).label('revenue')
    ).join(
        OrderItem, Product.id == OrderItem.product_id
    ).join(
        Order, Order.id == OrderItem.order_id
    ).filter(
        and_(
            Order.created_at >= start_date,
            Order.created_at <= end_date,
            Product.seller_id == seller_id
        )
    ).group_by(
        Product.name
    ).order_by(
        func.sum(OrderItem.quantity).desc()
    ).limit(5).all()

    return {
        "sales": [
            {
                "date": str(sale.date),
                "amount": float(sale.amount),
                "orders": sale.orders
            }
            for sale in sales_data
        ],
        "products": [
            {
                "category": product.category,
                "count": product.count
            }
            for product in products_by_category
        ],
        "revenue": {
            "total": float(total_revenue),
            "average": float(average_order_value),
            "growth": float(revenue_growth)
        },
        "orders": {
            "total": orders.total or 0,
            "pending": orders.pending or 0,
            "completed": orders.completed or 0,
            "cancelled": orders.cancelled or 0
        },
        "topProducts": [
            {
                "name": product.name,
                "sales": product.sales,
                "revenue": float(product.revenue)
            }
            for product in top_products
        ]
    } 