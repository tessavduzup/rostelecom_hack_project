"""create evaluation_statuses table

Revision ID: 052aa9fbd32e
Revises: f7663b5b0950
Create Date: 2025-10-25 10:06:21.246543

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '052aa9fbd32e'
down_revision: Union[str, Sequence[str], None] = 'f7663b5b0950'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'evaluation_statuses',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(), nullable=False, unique=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('evaluation_statuses')

