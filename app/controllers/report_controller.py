from app.cores.database import transactions_collection, fines_collection, books_collection
from app.schemas.report_schema import ReportRequest
from datetime import datetime
from typing import Optional
import csv
import io

async def borrowing_report(start_date: datetime = None, end_date: datetime = None):
    """Generate borrowing statistics report"""
    query = {}
    if start_date or end_date:
        date_query = {}
        if start_date:
            date_query["$gte"] = start_date
        if end_date:
            date_query["$lte"] = end_date
        query["borrow_date"] = date_query
    
    total_transactions = await transactions_collection.count_documents(query)
    borrowed = await transactions_collection.count_documents({**query, "status": "borrowed"})
    returned = await transactions_collection.count_documents({**query, "status": "returned"})
    overdue = await transactions_collection.count_documents({**query, "status": "overdue"})
    
    return {
        "report_type": "borrowing",
        "period": {
            "start_date": start_date,
            "end_date": end_date
        },
        "data": {
            "total_transactions": total_transactions,
            "currently_borrowed": borrowed,
            "returned": returned,
            "overdue": overdue
        },
        "generated_at": datetime.utcnow()
    }

async def fines_report(start_date: datetime = None, end_date: datetime = None):
    """Generate fines statistics report"""
    query = {}
    if start_date or end_date:
        date_query = {}
        if start_date:
            date_query["$gte"] = start_date
        if end_date:
            date_query["$lte"] = end_date
        query["created_at"] = date_query
    
    total_fines = 0.0
    pending_fines = 0.0
    paid_fines = 0.0
    waived_fines = 0.0
    
    async for fine in fines_collection.find(query):
        total_fines += fine["amount"]
        if fine["status"] == "pending":
            pending_fines += fine["amount"]
        elif fine["status"] == "paid":
            paid_fines += fine["amount"]
        elif fine["status"] == "waived":
            waived_fines += fine["amount"]
    
    return {
        "report_type": "fines",
        "period": {
            "start_date": start_date,
            "end_date": end_date
        },
        "data": {
            "total_amount": total_fines,
            "pending_amount": pending_fines,
            "paid_amount": paid_fines,
            "waived_amount": waived_fines
        },
        "generated_at": datetime.utcnow()
    }

async def popular_books_report(limit: int = 10):
    """Generate popular books report"""
    pipeline = [
        {"$group": {"_id": "$book_id", "borrow_count": {"$sum": 1}}},
        {"$sort": {"borrow_count": -1}},
        {"$limit": limit}
    ]
    
    popular_books = []
    async for result in transactions_collection.aggregate(pipeline):
        book = await books_collection.find_one({"_id": result["_id"]})
        if book:
            popular_books.append({
                "book_id": str(book["_id"]),
                "title": book["title"],
                "author": book["author"],
                "borrow_count": result["borrow_count"]
            })
    
    return {
        "report_type": "popular_books",
        "data": {
            "books": popular_books
        },
        "generated_at": datetime.utcnow()
    }

async def generate_custom_report(report_params: dict):
    """Generate custom report based on parameters"""
    # This is a flexible endpoint for custom reporting needs
    report_type = report_params.get("type", "custom")
    
    return {
        "report_type": report_type,
        "data": report_params,
        "message": "Custom report generated",
        "generated_at": datetime.utcnow()
    }

async def export_report(report_data: dict, export_format: str = "csv"):
    """Export report in specified format"""
    if export_format == "csv":
        # Convert report data to CSV
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write headers and data
        writer.writerow(["Report Type", report_data.get("report_type", "Unknown")])
        writer.writerow(["Generated At", str(report_data.get("generated_at", ""))])
        writer.writerow([])
        
        # Write data section
        data = report_data.get("data", {})
        for key, value in data.items():
            writer.writerow([key, value])
        
        return output.getvalue()
    
    # Default to JSON
    return report_data
