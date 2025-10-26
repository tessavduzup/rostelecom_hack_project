from datetime import datetime
import sqlalchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from . import Base, Project, User


class ProjectHistory(Base):
    __tablename__ = 'project_history'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    change_timestamp: Mapped[datetime] = mapped_column(default=datetime.now)
    change_field: Mapped[str] = mapped_column(nullable=False)
    old_value: Mapped[str] = mapped_column(sqlalchemy.Text())
    new_value: Mapped[str] = mapped_column(sqlalchemy.Text())
    change_type: Mapped[str] = mapped_column()

    # 🔗 Relationships
    project: Mapped["Project"] = relationship("Project")
    user: Mapped["User"] = relationship("User")

    def __repr__(self) -> str:
        return (
            f"<ProjectHistory(id={self.id!r}, project_id={self.project_id!r}, "
            f"user_id={self.user_id!r}, change_timestamp={self.change_timestamp!r}, "
            f"change_field={self.change_field!r}, old_value={self.old_value!r}, "
            f"new_value={self.new_value!r}, change_type={self.change_type!r})>"
        )
