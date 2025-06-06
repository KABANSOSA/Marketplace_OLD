from fastapi import APIRouter
from app.api.v1.endpoints import auth, products, orders, chat

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"]) 