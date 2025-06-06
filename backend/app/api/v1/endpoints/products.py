from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_active_user, get_current_active_seller
from app.models.user import User
from app.models.product import Product, Category, ProductImage
from app.schemas.product import (
    Product as ProductSchema,
    ProductCreate,
    ProductUpdate,
    ProductFilter,
    Category as CategorySchema,
    CategoryCreate,
    CategoryUpdate,
)
from sqlalchemy import or_

router = APIRouter()

@router.get("/", response_model=List[ProductSchema])
def list_products(
    *,
    db: Session = Depends(get_db),
    filter: ProductFilter = Depends(),
) -> Any:
    """
    Retrieve products with filtering and pagination.
    """
    query = db.query(Product)
    
    if filter.category_id:
        query = query.filter(Product.categories.any(Category.id == filter.category_id))
    if filter.min_price is not None:
        query = query.filter(Product.price >= filter.min_price)
    if filter.max_price is not None:
        query = query.filter(Product.price <= filter.max_price)
    if filter.brand:
        query = query.filter(Product.brand == filter.brand)
    if filter.condition:
        query = query.filter(Product.condition == filter.condition)
    if filter.search:
        search = f"%{filter.search}%"
        query = query.filter(
            or_(
                Product.name.ilike(search),
                Product.description.ilike(search),
                Product.sku.ilike(search),
                Product.brand.ilike(search),
                Product.model.ilike(search),
            )
        )
    
    # Apply sorting
    if filter.sort_by:
        sort_column = getattr(Product, filter.sort_by, None)
        if sort_column is not None:
            if filter.sort_order == "desc":
                query = query.order_by(sort_column.desc())
            else:
                query = query.order_by(sort_column.asc())
    
    # Apply pagination
    total = query.count()
    products = query.offset((filter.page - 1) * filter.per_page).limit(filter.per_page).all()
    
    return products

@router.post("/", response_model=ProductSchema)
def create_product(
    *,
    db: Session = Depends(get_db),
    product_in: ProductCreate,
    current_user: User = Depends(get_current_active_seller),
) -> Any:
    """
    Create new product.
    """
    product = Product(
        **product_in.dict(exclude={"category_ids", "images"}),
        seller_id=current_user.id,
    )
    
    # Add categories
    categories = db.query(Category).filter(Category.id.in_(product_in.category_ids)).all()
    product.categories = categories
    
    # Add images
    if product_in.images:
        images = [ProductImage(**img.dict(), product=product) for img in product_in.images]
        product.images = images
    
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
) -> Any:
    """
    Get product by ID.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductSchema)
def update_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    product_in: ProductUpdate,
    current_user: User = Depends(get_current_active_seller),
) -> Any:
    """
    Update product.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update basic fields
    for field, value in product_in.dict(exclude={"category_ids", "images"}).items():
        setattr(product, field, value)
    
    # Update categories if provided
    if product_in.category_ids is not None:
        categories = db.query(Category).filter(Category.id.in_(product_in.category_ids)).all()
        product.categories = categories
    
    # Update images if provided
    if product_in.images is not None:
        # Remove existing images
        db.query(ProductImage).filter(ProductImage.product_id == product.id).delete()
        # Add new images
        images = [ProductImage(**img.dict(), product=product) for img in product_in.images]
        product.images = images
    
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    current_user: User = Depends(get_current_active_seller),
) -> Any:
    """
    Delete product.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if product.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db.delete(product)
    db.commit()
    return {"status": "success"}

# Category endpoints
@router.get("/categories/", response_model=List[CategorySchema])
def list_categories(
    *,
    db: Session = Depends(get_db),
) -> Any:
    """
    Retrieve all categories.
    """
    categories = db.query(Category).all()
    return categories

@router.post("/categories/", response_model=CategorySchema)
def create_category(
    *,
    db: Session = Depends(get_db),
    category_in: CategoryCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new category.
    """
    category = Category(**category_in.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.put("/categories/{category_id}", response_model=CategorySchema)
def update_category(
    *,
    db: Session = Depends(get_db),
    category_id: int,
    category_in: CategoryUpdate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Update category.
    """
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    for field, value in category_in.dict().items():
        setattr(category, field, value)
    
    db.add(category)
    db.commit()
    db.refresh(category)
    return category 