from fastapi import APIRouter, Depends, Query
from app.controllers.report_controller import (
    borrowing_report, fines_report, popular_books_report,
    generate_custom_report, export_report
)
from app.schemas.report_schema import ReportRequest
from app.utils.auth import librarian_required
from datetime import datetime
from typing import Optional

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/borrowing", dependencies=[Depends(librarian_required)])
async def get_borrowing_report(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    """Generate borrowing statistics report"""
    return await borrowing_report(start_date, end_date)

@router.get("/fines", dependencies=[Depends(librarian_required)])
async def get_fines_report(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
):
    """Generate fines statistics report"""
    return await fines_report(start_date, end_date)

@router.get("/popular-books", dependencies=[Depends(librarian_required)])
async def get_popular_books(limit: int = Query(10, ge=1, le=50)):
    """Generate popular books report"""
    return await popular_books_report(limit)

@router.post("/custom", dependencies=[Depends(librarian_required)])
async def create_custom_report(report_params: dict):
    """Generate custom report"""
    return await generate_custom_report(report_params)

@router.post("/export", dependencies=[Depends(librarian_required)])
async def export_report_data(
    report_data: dict,
    format: str = Query("csv", regex="^(csv|json)$")
):
    """Export report in specified format"""
    return await export_report(report_data, format)
