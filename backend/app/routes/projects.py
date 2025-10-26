from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from ..db.database import get_db
from backend.app.db.models import Stage
from backend.app.db.models import User
from backend.app.db.models import Revenue
from backend.app.db.models import Cost
from backend.app.db.models import Project
from ..schemas.project import ProjectShortResponse, ProjectDetailResponse, ProjectUpdate
from ..schemas.revenue import RevenueResponse
from ..schemas.cost import CostResponse
from ..dependencies.auth import get_current_user

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("/", response_model=list[ProjectShortResponse])
def get_my_projects(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    # Получаем ФИО текущего пользователя для поиска его проектов
    user_full_name = f"{current_user.surname} {current_user.name} {current_user.patronymic}"

    projects = db.query(Project).options(
        joinedload(Project.stage)
    ).filter(
        Project.manager_name == user_full_name,
        Project.deleted_date.is_(None)
    ).all()

    # Преобразуем в схему с нужными полями
    result = []
    for project in projects:
        result.append(ProjectShortResponse(
            id=project.id,
            project_name=project.project_name,
            organization_name=project.organization_name,
            stage_name=project.stage.name,
            realisation_probability=project.realisation_probability
        ))

    return result


@router.get("/{project_id}", response_model=ProjectDetailResponse)
def get_project_details(
        project_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    # Получаем ФИО текущего пользователя
    user_full_name = f"{current_user.surname} {current_user.name} {current_user.patronymic}"

    project = db.query(Project).options(
        joinedload(Project.service),
        joinedload(Project.payment_type),
        joinedload(Project.stage),
        joinedload(Project.business_segment),
        joinedload(Project.evaluation_status)
    ).filter(
        Project.id == project_id,
        Project.manager_name == user_full_name,
        Project.deleted_date.is_(None)
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Преобразуем в детальную схему
    return ProjectDetailResponse(
        id=project.id,
        organization_name=project.organization_name,
        inn=project.inn,
        project_name=project.project_name,
        service_name=project.service.name,
        payment_type_name=project.payment_type.name,
        stage_name=project.stage.name,
        realisation_probability=project.realisation_probability,
        manager_name=project.manager_name,
        business_segment_name=project.business_segment.name,
        implementation_year=project.implementation_year,
        is_industry_solution=project.is_industry_solution,
        is_forecast_accepted=project.is_forecast_accepted,
        is_dzo_implementation=project.is_dzo_implementation,
        is_management_control_required=project.is_management_control_required,
        evaluation_status_name=project.evaluation_status.name if project.evaluation_status else None,
        industry_manager=project.industry_manager,
        project_number=project.project_number,
        current_status=project.current_status,
        done_this_period=project.done_this_period,
        next_period_plans=project.next_period_plans
    )


@router.get("/{project_id}/revenues", response_model=list[RevenueResponse])
def get_project_revenues(
        project_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    # Проверяем что проект принадлежит пользователю
    user_full_name = f"{current_user.surname} {current_user.name} {current_user.patronymic}"
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.manager_name == user_full_name
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    revenues = db.query(Revenue).options(
        joinedload(Revenue.accrual_status)
    ).filter(Revenue.project_id == project_id).all()

    result = []
    for revenue in revenues:
        result.append(RevenueResponse(
            id=revenue.id,
            year=revenue.year,
            month=revenue.month,
            amount=revenue.amount,
            accrual_status_name=revenue.accrual_status.name
        ))

    return result


@router.get("/{project_id}/costs", response_model=list[CostResponse])
def get_project_costs(
        project_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    # Проверяем что проект принадлежит пользователю
    user_full_name = f"{current_user.surname} {current_user.name} {current_user.patronymic}"
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.manager_name == user_full_name
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    costs = db.query(Cost).options(
        joinedload(Cost.cost_article),
        joinedload(Cost.cost_type),
        joinedload(Cost.reflection_status)
    ).filter(Cost.project_id == project_id).all()

    result = []
    for cost in costs:
        result.append(CostResponse(
            id=cost.id,
            year=cost.year,
            month=cost.month,
            amount=cost.amount,
            cost_article_name=cost.cost_article.name,
            cost_type_name=cost.cost_type.name,
            reflection_status_name=cost.reflection_status.name
        ))

    return result


@router.put("/{project_id}", response_model=ProjectDetailResponse)
def update_project(
        project_id: int,
        project_update: ProjectUpdate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    user_full_name = f"{current_user.surname} {current_user.name} {current_user.patronymic}"

    project = db.query(Project).options(
        joinedload(Project.service),
        joinedload(Project.payment_type),
        joinedload(Project.stage),
        joinedload(Project.business_segment),
        joinedload(Project.evaluation_status)
    ).filter(
        Project.id == project_id,
        Project.manager_name == user_full_name,
        Project.deleted_date.is_(None)
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Обновляем поля
    update_data = project_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)

    # Если меняется этап - обновляем вероятность
    if project_update.stage_id:
        stage = db.query(Stage).filter(Stage.id == project_update.stage_id).first()
        if stage:
            project.realisation_probability = stage.probability

    project.updated_date = datetime.now()
    db.commit()
    db.refresh(project)

    # Возвращаем обновленный проект
    return ProjectDetailResponse(
        id=project.id,
        organization_name=project.organization_name,
        inn=project.inn,
        project_name=project.project_name,
        service_name=project.service.name,
        payment_type_name=project.payment_type.name,
        stage_name=project.stage.name,
        realisation_probability=project.realisation_probability,
        manager_name=project.manager_name,
        business_segment_name=project.business_segment.name,
        implementation_year=project.implementation_year,
        is_industry_solution=project.is_industry_solution,
        is_forecast_accepted=project.is_forecast_accepted,
        is_dzo_implementation=project.is_dzo_implementation,
        is_management_control_required=project.is_management_control_required,
        evaluation_status_name=project.evaluation_status.name if project.evaluation_status else None,
        industry_manager=project.industry_manager,
        project_number=project.project_number,
        current_status=project.current_status,
        done_this_period=project.done_this_period,
        next_period_plans=project.next_period_plans
    )