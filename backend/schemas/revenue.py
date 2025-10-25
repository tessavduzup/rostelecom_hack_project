from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# Revenue Schemas
class RevenueResponse(BaseModel):
    id: int
    year: int
    month: int
    amount: float
    accrual_status_name: str

    class Config:
        from_attributes = True