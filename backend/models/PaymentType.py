from sqlalchemy.orm import Mapped, mapped_column
from Base import Base

class PaymentType(Base):
    __tablename__ = 'payment_types'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)

    def __repr__(self) -> str:
        return f"<PaymentType(id={self.id!r}, name={self.name!r})>"
