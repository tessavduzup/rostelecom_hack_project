"""create reflection_statuses table

Revision ID: 2e1e3e74eb2f
Revises: febfee914310
Create Date: 2025-10-25 10:33:56.075686

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2e1e3e74eb2f'
down_revision: Union[str, Sequence[str], None] = 'febfee914310'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'reflection_statuses',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(length=255), nullable=False, unique=True)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('reflection_statuses')
