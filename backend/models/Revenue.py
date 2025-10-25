from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from Base import Base

class Revenue(Base):
    __tablename__ = 'revenues'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
    year: Mapped[int] = mapped_column(nullable=False)
    month: Mapped[int] = mapped_column(nullable=False)
    amount: Mapped[float] = mapped_column(nullable=False)
    accrual_status_id: Mapped[int] = mapped_column(ForeignKey("accrual_statuses.id"), nullable=False)


    def __repr__(self) -> str:
        return (
            f"<Revenue(id={self.id!r}, project_id={self.project_id!r}, "
            f"year={self.year!r}, month={self.month!r}, amount={self.amount!r}, "
            f"accrual_status_id={self.accrual_status_id!r})>"
        )
