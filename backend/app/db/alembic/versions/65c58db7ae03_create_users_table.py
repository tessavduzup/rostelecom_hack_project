"""create users table

Revision ID: 65c58db7ae03
Revises: 85f0c297536f
Create Date: 2025-10-25 10:36:40.222444

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import func

# revision identifiers, used by Alembic.
revision: str = '85f0c297536f'
down_revision: Union[str, Sequence[str], None] = '6b3166ed2fe0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('email', sa.String(length=255), nullable=True, unique=True),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('role', sa.String(length=255), nullable=False),
        sa.Column('surname', sa.String(length=255), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('patronymic', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime, nullable=False, server_default=func.now()),
        sa.Column('deleted_at', sa.DateTime, nullable=True)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('users')
