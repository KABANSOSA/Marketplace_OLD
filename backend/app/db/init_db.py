from sqlalchemy.orm import Session
from app.core.config import get_settings
from app.models.base import Base
from app.db.session import engine
from app.models.user import User, UserRole
from app.models.product import Category
from passlib.context import CryptContext

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init_db(db: Session) -> None:
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Create admin user if not exists
    admin = db.query(User).filter(User.email == "admin@example.com").first()
    if not admin:
        admin = User(
            email="admin@example.com",
            hashed_password=pwd_context.hash("admin123"),  # Change in production
            full_name="Admin User",
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin)
    
    # Create default categories
    categories = [
        {"name": "Engine Parts", "slug": "engine-parts"},
        {"name": "Transmission", "slug": "transmission"},
        {"name": "Hydraulics", "slug": "hydraulics"},
        {"name": "Electrical", "slug": "electrical"},
        {"name": "Filters", "slug": "filters"},
        {"name": "Brakes", "slug": "brakes"},
        {"name": "Suspension", "slug": "suspension"},
        {"name": "Body Parts", "slug": "body-parts"},
    ]
    
    for cat_data in categories:
        category = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
        if not category:
            category = Category(**cat_data)
            db.add(category)
    
    db.commit() 