"""create stages table

Revision ID: 85f0c297536f
Revises: 6b3166ed2fe0
Create Date: 2025-10-25 10:36:03.038225

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9c5bd1d784cc'
down_revision: Union[str, Sequence[str], None] = '01a863ed81a1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'stages',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(length=255), nullable=False, unique=True),
        sa.Column('probability', sa.Float, nullable=False)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('stages')
