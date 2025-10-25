from sqlalchemy.orm import Mapped, mapped_column
from Base import Base

class Stage(Base):
    __tablename__ = 'stages'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    probability: Mapped[float] = mapped_column(nullable=False)

    def __repr__(self) -> str:
        return f"<Stage(id={self.id!r}, name={self.name!r}, probability={self.probability!r})>"
