from datetime import datetime
from typing import Optional

import sqlalchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from Base import Base
from .Service import Service

class Project(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    organization_name: Mapped[str] = mapped_column(nullable=False)
    inn: Mapped[str] = mapped_column(nullable=False)
    project_name: Mapped[str] = mapped_column(nullable=False)
    service_id: Mapped[int] = mapped_column(nullable=False)
    payment_type_id: Mapped[int] = mapped_column(nullable=False)
    stage_id: Mapped[int] = mapped_column(nullable=False)
    realisation_probability: Mapped[float] = mapped_column()
    manager_name: Mapped[str] = mapped_column(nullable=False)
    business_segment_id: Mapped[int] = mapped_column(ForeignKey("business_segments.id"), nullable=False)
    implementation_year: Mapped[int] = mapped_column(nullable=False)
    is_industry_solution: Mapped[bool] = mapped_column(default=False)
    is_forecast_accepted: Mapped[bool] = mapped_column(default=False)
    is_dzo_implementation: Mapped[bool] = mapped_column(default=False)
    is_management_control_required: Mapped[bool] = mapped_column(default=False)
    evaluation_status_id: Mapped[int] = mapped_column(ForeignKey("evaluation_statuses.id"), )
    industry_manager: Mapped[str] = mapped_column()
    project_number: Mapped[str] = mapped_column()
    created_date: Mapped[datetime] = mapped_column(default=datetime.now)
    updated_date: Mapped[datetime] = mapped_column(default=datetime.now)
    deleted_date: Mapped[datetime] = mapped_column()
    current_status: Mapped[str] = mapped_column(sqlalchemy.Text())
    done_this_period: Mapped[str] = mapped_column(sqlalchemy.Text())
    next_period_plans: Mapped[str] = mapped_column(sqlalchemy.Text())

    # Relationships
    service: Mapped['Service'] = relationship()
    payment_type: Mapped['PaymentType'] = relationship()
    stage: Mapped['Stage'] = relationship()
    business_segment: Mapped['BusinessSegment'] = relationship()
    evaluation_status: Mapped[Optional['EvaluationStatus']] = relationship()
    revenues: Mapped[list['Revenue']] = relationship(back_populates='project')
    costs: Mapped[list['Cost']] = relationship(back_populates='project')

    def __repr__(self) -> str:
        return (
            f"<Project(id={self.id!r}, organization_name={self.organization_name!r}, "
            f"project_name={self.project_name!r}, manager_name={self.manager_name!r}, "
            f"implementation_year={self.implementation_year!r}, current_status={self.current_status!r})>"
        )
