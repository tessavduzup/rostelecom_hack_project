"""create projects table

Revision ID: 9c5bd1d784cc
Revises: 01a863ed81a1
Create Date: 2025-10-25 10:09:55.395930

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'febfee914310'
down_revision: Union[str, Sequence[str], None] = '9c5bd1d784cc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'projects',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('organization_name', sa.String(length=255), nullable=False, unique=True),
        sa.Column('inn', sa.String(length=255), nullable=False),
        sa.Column('project_name', sa.String(length=255), nullable=False),
        sa.Column('service_id', sa.Integer, sa.ForeignKey('services.id'), nullable=False),
        sa.Column('payment_type_id', sa.Integer, sa.ForeignKey('payment_types.id'), nullable=False),
        sa.Column('stage_id', sa.Integer, sa.ForeignKey('stages.id'), nullable=False),
        sa.Column('realisation_probability', sa.Integer, nullable=True),
        sa.Column('manager_name', sa.String(length=255), nullable=False),
        sa.Column('business_segment_id', sa.Integer, sa.ForeignKey('business_segments.id'), nullable=False),
        sa.Column('implementation_year', sa.Integer, nullable=False),
        sa.Column('is_industry_solution', sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column('is_forecast_accepted', sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column('is_dzo_implementation', sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column('is_management_control_required', sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column('evaluation_status_id', sa.Integer, sa.ForeignKey('evaluation_statuses.id'), nullable=True),
        sa.Column('industry_manager', sa.String(length=255), nullable=True),
        sa.Column('project_number', sa.String(length=255), nullable=True),
        sa.Column('created_date', sa.DateTime, nullable=False, server_default=sa.func.now()),
        sa.Column('updated_date', sa.DateTime, nullable=False, server_default=sa.func.now()),
        sa.Column('deleted_date', sa.DateTime, nullable=True),
        sa.Column('current_status', sa.Text, nullable=True),
        sa.Column('done_this_period', sa.Text, nullable=True),
        sa.Column('next_period_plans', sa.Text, nullable=True)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('projects')
