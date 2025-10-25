from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped
from sqlalchemy.testing.schema import mapped_column

from Base import Base

class Users(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(), unique=True)
    hashed_password: Mapped[str] = mapped_column(String())
    role: Mapped[str] = mapped_column(String())
    surname: Mapped[str] = mapped_column(String())
    name: Mapped[str] = mapped_column(String())
    patronymic: Mapped[str] = mapped_column(String())
    created_at: Mapped[str] = mapped_column(DateTime())
    deleted_at: Mapped[str] = mapped_column(DateTime())

    def __repr__(self):
        return f"User(id={self.id!r})"