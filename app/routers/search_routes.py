from fastapi import APIRouter, Query
from app.controllers.search_controller import (
    advanced_search, get_suggestions, get_ai_recommendations, semantic_search
)
from app.schemas.search_schema import AdvancedSearchRequest

router = APIRouter(prefix="/search", tags=["Search"])

@router.post("/advanced")
async def perform_advanced_search(search_params: AdvancedSearchRequest):
    """Advanced search with multiple filters"""
    return await advanced_search(search_params)

@router.get("/suggestions")
async def get_search_suggestions(
    q: str = Query(..., min_length=2),
    type: str = Query("all", regex="^(all|titles|authors|categories)$")
):
    """Get autocomplete suggestions"""
    return await get_suggestions(q, type)

@router.get("/recommendations/{member_id}")
async def get_recommendations(member_id: str):
    """Get personalized book recommendations"""
    return await get_ai_recommendations(member_id)

@router.post("/semantic")
async def perform_semantic_search(query: str = Query(..., min_length=3)):
    """Semantic search across all book fields"""
    return await semantic_search(query)
