# accounting.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel
from typing import List, Optional

# --- Database Setup Placeholder ---
# NOTE: Replace this with your actual database connection logic (e.g., SQLAlchemy/Alembic setup)
# This is a simplified, non-persistent list for demonstration if you don't have a DB set up yet.
# For production, replace this with proper DB calls.
class PortfolioItem(BaseModel):
    id: Optional[int] = None  # Optional for incoming new data
    date: str  # e.g., "Jun 10, 2023"
    time: str  # e.g., "8:11 AM"
    financial_choice: str
    type: str
    amount: float
    per_unit: str

# In a real app, this would be a database table/session.
DUMMY_DB = [
    PortfolioItem(id=1, date="Jun 10, 2023", time="8:11 AM", financial_choice="1-Bedroom Condo (Bangkok)", type="Real Estate", amount=2800000.00, per_unit="Unit"),
    PortfolioItem(id=2, date="Jun 12, 2023", time="8:13 AM", financial_choice="Brent Crude Oil", type="Commodities", amount=2700.00, per_unit="Barrel"),
    PortfolioItem(id=3, date="Jun 14, 2023", time="7:50 AM", financial_choice="AOT Stock", type="Stocks", amount=73.00, per_unit="Share"),
    PortfolioItem(id=4, date="Jun 18, 2023", time="8:55 AM", financial_choice="PTT Stock", type="Stocks", amount=42.00, per_unit="Share"),
    PortfolioItem(id=5, date="Jun 20, 2023", time="7:15 AM", financial_choice="24K Gold", type="Commodities", amount=2250.00, per_unit="Gram"),
    PortfolioItem(id=6, date="Jun 22, 2023", time="8:15 AM", financial_choice="1-Bedroom House (Chiang Mai)", type="Real Estate", amount=5200000.00, per_unit="Unit"),
    PortfolioItem(id=7, date="Jun 25, 2023", time="8:53 AM", financial_choice="3-Month Thai Government Bond", type="Cash Equivalents", amount=1050.00, per_unit="Bond"),
    PortfolioItem(id=8, date="Jun 26, 2023", time="9:00 AM", financial_choice="Test Asset 8", type="Other", amount=100.00, per_unit="Unit"),
    PortfolioItem(id=9, date="Jun 27, 2023", time="9:10 AM", financial_choice="Test Asset 9", type="Other", amount=200.00, per_unit="Unit"),
    PortfolioItem(id=10, date="Jun 28, 2023", time="9:20 AM", financial_choice="Test Asset 10", type="Other", amount=300.00, per_unit="Unit"),
    PortfolioItem(id=11, date="Jun 29, 2023", time="9:30 AM", financial_choice="Test Asset 11", type="Other", amount=400.00, per_unit="Unit"),
    PortfolioItem(id=12, date="Jun 30, 2023", time="9:40 AM", financial_choice="Test Asset 12", type="Other", amount=500.00, per_unit="Unit"),
]
next_id = 13
# ----------------------------------------

router = APIRouter(
    prefix="/accounting",
    tags=["accounting"]
)

@router.get("/portfolio", response_model=List[PortfolioItem])
def get_portfolio_data(
    page: int = Query(1, ge=1, description="Page number for pagination"),
    limit: int = Query(7, ge=1, le=100, description="Items per page")
):
    """
    Retrieves a paginated list of portfolio items.
    The pagination is handled by the 'page' and 'limit' query parameters.
    """
    # Calculate slice indices for pagination
    start_index = (page - 1) * limit
    end_index = start_index + limit
    
    # Simulate DB query with LIMIT and OFFSET
    paginated_data = DUMMY_DB[start_index:end_index]
    total_items = len(DUMMY_DB)
    
    # Return data along with total count for frontend to calculate total pages
    return {
        "data": paginated_data,
        "total_items": total_items,
        "total_pages": (total_items + limit - 1) // limit # Ceiling division
    }

@router.post("/insert", response_model=PortfolioItem, status_code=status.HTTP_201_CREATED)
def insert_portfolio_item(item: PortfolioItem):
    """
    Inserts a new portfolio item into the database.
    Assigns a unique ID (simulated).
    """
    global next_id
    # Ensure no ID is provided by the client (it's auto-generated)
    if item.id is not None:
        raise HTTPException(status_code=400, detail="ID must not be provided for a new item.")
    
    # In a real DB, the INSERT operation would return the new item including its generated ID.
    item.id = next_id
    next_id += 1
    DUMMY_DB.append(item)
    
    return item

@router.delete("/delete/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_portfolio_item(item_id: int):
    """
    Deletes a specific portfolio item by its ID.
    """
    global DUMMY_DB
    initial_length = len(DUMMY_DB)
    
    # Filter out the item to be deleted
    DUMMY_DB = [item for item in DUMMY_DB if item.id != item_id]
    
    if len(DUMMY_DB) == initial_length:
        # Item with the given ID was not found
        raise HTTPException(status_code=404, detail=f"Item with ID {item_id} not found.")
    
    return