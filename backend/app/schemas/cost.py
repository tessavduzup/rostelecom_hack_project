from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# Cost Schemas
class CostResponse(BaseModel):
    id: int
    year: int
    month: int
    amount: float
    cost_article_name: str
    cost_type_name: str
    reflection_status_name: str

    class Config:
        from_attributes = True
