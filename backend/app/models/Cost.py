from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from . import Base, Project, CostArticle, CostType, ReflectionStatus


class Cost(Base):
    __tablename__ = 'costs'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
    cost_article_id: Mapped[int] = mapped_column(ForeignKey("cost_articles.id"), nullable=False)
    cost_type_id: Mapped[int] = mapped_column(ForeignKey("cost_types.id"), nullable=False)
    reflection_status_id: Mapped[int] = mapped_column(ForeignKey("reflection_statuses.id"), nullable=False)

    year: Mapped[int] = mapped_column(nullable=False)
    month: Mapped[int] = mapped_column(nullable=False)
    amount: Mapped[float] = mapped_column(nullable=False)

    # 🔗 Relationships
    project: Mapped["Project"] = relationship("Project", back_populates="costs")
    cost_article: Mapped["CostArticle"] = relationship("CostArticle", back_populates="costs")
    cost_type: Mapped["CostType"] = relationship("CostType", back_populates="costs")
    reflection_status: Mapped["ReflectionStatus"] = relationship("ReflectionStatus", back_populates="costs")

    def __repr__(self) -> str:
        return (
            f"<Cost(id={self.id!r}, project_id={self.project_id!r}, "
            f"year={self.year!r}, month={self.month!r}, amount={self.amount!r}, "
            f"cost_article_id={self.cost_article_id!r}, cost_type_id={self.cost_type_id!r}, "
            f"reflection_status_id={self.reflection_status_id!r})>"
        )
