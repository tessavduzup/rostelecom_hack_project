# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"