from sqlalchemy import Column, String, Float, Integer, ForeignKey, Boolean, Table, Text
from sqlalchemy.orm import relationship
from .base import BaseModel

# Association table for product categories
product_category = Table(
    'product_category',
    BaseModel.metadata,
    Column('product_id', Integer, ForeignKey('products.id')),
    Column('category_id', Integer, ForeignKey('categories.id'))
)

class Category(BaseModel):
    __tablename__ = "categories"

    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey('categories.id'), nullable=True)
    
    # Relationships
    parent = relationship("Category", remote_side=[id], backref="subcategories")
    products = relationship("Product", secondary=product_category, back_populates="categories")

    def __repr__(self):
        return f"<Category {self.name}>"

class Product(BaseModel):
    __tablename__ = "products"

    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    sku = Column(String, unique=True, nullable=False)
    brand = Column(String)
    model = Column(String)
    condition = Column(String)  # new/used
    is_active = Column(Boolean, default=True)
    
    # Foreign keys
    seller_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    
    # Relationships
    seller = relationship("User", back_populates="products")
    categories = relationship("Category", secondary=product_category, back_populates="products")
    images = relationship("ProductImage", back_populates="product")
    reviews = relationship("Review", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    
    def __repr__(self):
        return f"<Product {self.name}>"

class ProductImage(BaseModel):
    __tablename__ = "product_images"

    url = Column(String, nullable=False)
    alt_text = Column(String)
    is_primary = Column(Boolean, default=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    
    # Relationships
    product = relationship("Product", back_populates="images")
    
    def __repr__(self):
        return f"<ProductImage {self.url}>" 