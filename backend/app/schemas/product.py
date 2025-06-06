from typing import Optional, List
from pydantic import BaseModel, HttpUrl
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    parent_id: Optional[int] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProductImageBase(BaseModel):
    url: HttpUrl
    alt_text: Optional[str] = None
    is_primary: bool = False

class ProductImageCreate(ProductImageBase):
    pass

class ProductImage(ProductImageBase):
    id: int
    product_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    stock: int
    sku: str
    brand: Optional[str] = None
    model: Optional[str] = None
    condition: str
    is_active: bool = True

class ProductCreate(ProductBase):
    category_ids: List[int]
    images: Optional[List[ProductImageCreate]] = None

class ProductUpdate(ProductBase):
    category_ids: Optional[List[int]] = None
    images: Optional[List[ProductImageCreate]] = None

class Product(ProductBase):
    id: int
    seller_id: int
    created_at: datetime
    updated_at: datetime
    categories: List[Category]
    images: List[ProductImage]

    class Config:
        from_attributes = True

class ProductFilter(BaseModel):
    category_id: Optional[int] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    brand: Optional[str] = None
    condition: Optional[str] = None
    search: Optional[str] = None
    sort_by: Optional[str] = None
    sort_order: Optional[str] = None
    page: int = 1
    per_page: int = 20 