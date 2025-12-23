from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import (
    auth_routes, book_routes, member_routes, transaction_routes,
    fine_routes, reservation_routes, search_routes, ebook_routes,
    report_routes, system_routes, ai_routes
)

app = FastAPI(
    title="Library Management System",
    description="Comprehensive Library Management System with 54 API endpoints",
    version="1.0.0"
)

# ✅ CORS CONFIG
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend URLs (for dev)
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],  # Authorization, Content-Type, etc
)

# Include all routers
app.include_router(auth_routes.router)
app.include_router(book_routes.router)
app.include_router(member_routes.router)
app.include_router(transaction_routes.router)
app.include_router(fine_routes.router)
app.include_router(reservation_routes.router)
app.include_router(search_routes.router)
app.include_router(ebook_routes.router)
app.include_router(report_routes.router)
app.include_router(system_routes.router)
app.include_router(ai_routes.router)

@app.get("/")
def root():
    return {
        "status": "Server running",
        "message": "Library Management System API",
        "version": "1.0.0",
        "total_endpoints": 54,
        "documentation": "/docs"
    }
