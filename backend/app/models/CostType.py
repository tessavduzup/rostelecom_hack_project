from sqlalchemy.orm import Mapped, mapped_column
from .Base import Base

class CostType(Base):
    __tablename__ = 'cost_types'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)

    def __repr__(self) -> str:
        return f"<CostType(id={self.id!r}, name={self.name!r})>"
