from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from Base import Base

class Cost(Base):
    __tablename__ = 'costs'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
    year: Mapped[int] = mapped_column(nullable=False)
    month: Mapped[int] = mapped_column(nullable=False)
    amount: Mapped[float] = mapped_column(nullable=False)
    cost_article_id: Mapped[int] = mapped_column(ForeignKey("cost_articles.id"), nullable=False)
    cost_type_id: Mapped[int] = mapped_column(ForeignKey("cost_types.id"), nullable=False)
    reflection_status_id: Mapped[int] = mapped_column(ForeignKey("reflection_statuses.id"), nullable=False)

    def __repr__(self) -> str:
        return (
            f"<Cost(id={self.id!r}, project_id={self.project_id!r}, "
            f"year={self.year!r}, month={self.month!r}, amount={self.amount!r}, "
            f"cost_article_id={self.cost_article_id!r}, cost_type_id={self.cost_type_id!r}, "
            f"reflection_status_id={self.reflection_status_id!r})>"
        )
