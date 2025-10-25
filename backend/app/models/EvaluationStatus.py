from sqlalchemy.orm import Mapped, mapped_column
from .Base import Base

class EvaluationStatus(Base):
    __tablename__ = 'evaluation_statuses'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)

    def __repr__(self) -> str:
        return f"<EvaluationStatus(id={self.id!r}, name={self.name!r})>"
