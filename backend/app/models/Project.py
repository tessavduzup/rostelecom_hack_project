from datetime import datetime
from typing import Optional, List

import sqlalchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from . import (
    Base,
    Service,
    PaymentType,
    Stage,
    BusinessSegment,
    EvaluationStatus,
    Revenue,
    Cost
)


class Project(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    organization_name: Mapped[str] = mapped_column(nullable=False)
    inn: Mapped[str] = mapped_column(nullable=False)
    project_name: Mapped[str] = mapped_column(nullable=False)
    service_id: Mapped[int] = mapped_column(ForeignKey("services.id"), nullable=False)
    payment_type_id: Mapped[int] = mapped_column(ForeignKey("payment_types.id"), nullable=False)
    stage_id: Mapped[int] = mapped_column(ForeignKey("stages.id"), nullable=False)
    realisation_probability: Mapped[float] = mapped_column()
    manager_name: Mapped[str] = mapped_column(nullable=False)
    business_segment_id: Mapped[int] = mapped_column(ForeignKey("business_segments.id"), nullable=False)
    implementation_year: Mapped[int] = mapped_column(nullable=False)
    is_industry_solution: Mapped[bool] = mapped_column(default=False)
    is_forecast_accepted: Mapped[bool] = mapped_column(default=False)
    is_dzo_implementation: Mapped[bool] = mapped_column(default=False)
    is_management_control_required: Mapped[bool] = mapped_column(default=False)
    evaluation_status_id: Mapped[Optional[int]] = mapped_column(ForeignKey("evaluation_statuses.id"))
    industry_manager: Mapped[Optional[str]] = mapped_column()
    project_number: Mapped[Optional[str]] = mapped_column()
    created_date: Mapped[datetime] = mapped_column(default=datetime.now)
    updated_date: Mapped[datetime] = mapped_column(default=datetime.now, onupdate=datetime.now)
    deleted_date: Mapped[Optional[datetime]] = mapped_column()
    current_status: Mapped[Optional[str]] = mapped_column(sqlalchemy.Text())
    done_this_period: Mapped[Optional[str]] = mapped_column(sqlalchemy.Text())
    next_period_plans: Mapped[Optional[str]] = mapped_column(sqlalchemy.Text())

    service: Mapped["Service"] = relationship("Service", back_populates="projects")
    payment_type: Mapped["PaymentType"] = relationship("PaymentType", back_populates="projects")
    stage: Mapped["Stage"] = relationship("Stage", back_populates="projects")
    business_segment: Mapped["BusinessSegment"] = relationship("BusinessSegment", back_populates="projects")
    evaluation_status: Mapped[Optional["EvaluationStatus"]] = relationship("EvaluationStatus", back_populates="projects")

    revenues: Mapped[List["Revenue"]] = relationship("Revenue", back_populates="project", cascade="all, delete-orphan")
    costs: Mapped[List["Cost"]] = relationship("Cost", back_populates="project", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return (
            f"<Project(id={self.id!r}, organization_name={self.organization_name!r}, "
            f"project_name={self.project_name!r}, manager_name={self.manager_name!r}, "
            f"implementation_year={self.implementation_year!r}, current_status={self.current_status!r})>"
        )
