from sqlalchemy.orm import Mapped, mapped_column
from .Base import Base

class AccrualStatus(Base):
    __tablename__ = 'accrual_statuses'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)

    def __repr__(self) -> str:
        return f"<AccrualStatus(id={self.id!r}, name={self.name!r})>"