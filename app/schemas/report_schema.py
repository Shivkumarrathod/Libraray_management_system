from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportRequest(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    format: str = "json"  # json, csv, pdf

class ReportResponse(BaseModel):
    report_type: str
    generated_at: datetime
    data: dict
