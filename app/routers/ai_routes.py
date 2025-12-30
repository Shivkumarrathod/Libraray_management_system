from fastapi import APIRouter
from app.controllers.ai_controller import chat_assistant, query_data, get_analytics
from app.schemas.ai_schema import ChatRequest, QueryRequest

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/chat")
async def chat(chat_data: ChatRequest):
    """Chat with AI assistant"""
    return await chat_assistant(chat_data)

@router.post("/query")
async def query(request: QueryRequest):
    """Natural language query to database"""
    return await query_data(request)

@router.get("/analytics")
async def analytics():
    """Get AI-powered analytics insights"""
    return await get_analytics()
