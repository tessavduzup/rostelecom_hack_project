"""create accural_statuses table

Revision ID: 78d2e5460558
Revises: 
Create Date: 2025-10-25 09:59:28.723670

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '78d2e5460558'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'accrual_statuses',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(), nullable=False, unique=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('accrual_statuses')

