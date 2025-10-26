from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from . import Base, ProjectHistory


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[str] = mapped_column(nullable=False, default='manager')
    surname: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    patronymic: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now)
    deleted_at: Mapped[datetime] = mapped_column()

    # 🔗 Relationship: связь с ProjectHistory
    project_changes: Mapped[list["ProjectHistory"]] = relationship(
        "ProjectHistory",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return (
            f"<User(id={self.id!r}, email={self.email!r}, role={self.role!r}, "
            f"surname={self.surname!r}, name={self.name!r})>"
        )
