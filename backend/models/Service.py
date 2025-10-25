from sqlalchemy.orm import Mapped, mapped_column
from Base import Base

class Service(Base):
    __tablename__ = 'services'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    service_large_category: Mapped[str] = mapped_column()

    def __repr__(self) -> str:
        return f"<Service(id={self.id!r}, name={self.name!r}, service_large_category={self.service_large_category!r})>"
