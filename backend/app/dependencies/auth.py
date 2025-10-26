from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from ..db.database import get_db
from backend.app.db.models import User
from backend.app.auth.auth import verify_token

security = HTTPBearer()

async def get_current_user(
    credentials = Depends(security),
    db: Session = Depends(get_db)
) -> type[User]:
    user_id = verify_token(credentials.credentials)
    user = db.query(User).filter(User.id == user_id, User.deleted_at.is_(None)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user