from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.api.v1.api import api_router
from app.core.config import get_settings
from app.db.init_db import init_db
from app.db.session import SessionLocal

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API for Special Equipment Parts Marketplace",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Error handling
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": str(exc)},
    )

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Marketplace API",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    } 