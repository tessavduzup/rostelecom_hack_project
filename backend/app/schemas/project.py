from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# Project Schemas (для списка на стартовой странице)
class ProjectShortResponse(BaseModel):
    id: int
    project_name: str
    organization_name: str
    stage_name: str
    realisation_probability: float

    class Config:
        from_attributes = True

# Project Schemas (для детальной страницы)
class ProjectDetailResponse(BaseModel):
    id: int
    organization_name: str
    inn: str
    project_name: str
    service_name: str
    payment_type_name: str
    stage_name: str
    realisation_probability: float
    manager_name: str
    business_segment_name: str
    implementation_year: int
    is_industry_solution: bool
    is_forecast_accepted: bool
    is_dzo_implementation: bool
    is_management_control_required: bool
    evaluation_status_name: Optional[str] = None
    industry_manager: Optional[str] = None
    project_number: Optional[str] = None
    current_status: Optional[str] = None
    done_this_period: Optional[str] = None
    next_period_plans: Optional[str] = None

    class Config:
        from_attributes = True

# Project Update Schema
class ProjectUpdate(BaseModel):
    current_status: Optional[str] = None
    done_this_period: Optional[str] = None
    next_period_plans: Optional[str] = None
    stage_id: Optional[int] = None