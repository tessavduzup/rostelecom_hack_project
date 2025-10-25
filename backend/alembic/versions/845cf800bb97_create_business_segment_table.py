"""create business_segment table

Revision ID: 845cf800bb97
Revises: 78d2e5460558
Create Date: 2025-10-25 10:00:13.753048

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '845cf800bb97'
down_revision: Union[str, Sequence[str], None] = '78d2e5460558'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'business_segments',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(), nullable=False, unique=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('business_segments')

