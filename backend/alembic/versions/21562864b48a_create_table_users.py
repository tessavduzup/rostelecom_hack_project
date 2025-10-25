"""create_table_users

Revision ID: 21562864b48a
Revises: 
Create Date: 2025-10-25 02:18:24.460381

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '21562864b48a'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('email', sa.String, unique=True),
        sa.Column('hashed_password', sa.String, nullable=False),
        sa.Column('role', sa.String, nullable=False),
        sa.Column('surname', sa.String),
        sa.Column('name', sa.String),
        sa.Column('patronymic', sa.String),
        sa.Column('created_at', sa.DateTime, default=sa.func.now()),
        sa.Column('deleted_at', sa.DateTime),
        sa.Column('two_factor_secret')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('users')
