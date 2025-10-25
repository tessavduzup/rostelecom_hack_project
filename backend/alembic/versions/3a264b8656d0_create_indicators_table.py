"""create indicators table

Revision ID: 3a264b8656d0
Revises: 052aa9fbd32e
Create Date: 2025-10-25 10:07:19.423373

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3a264b8656d0'
down_revision: Union[str, Sequence[str], None] = '052aa9fbd32e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'indicators',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(), nullable=False, unique=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('indicators')
