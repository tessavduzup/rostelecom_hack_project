"""create payment_types table

Revision ID: 01a863ed81a1
Revises: 3a264b8656d0
Create Date: 2025-10-25 10:08:57.476313

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '01a863ed81a1'
down_revision: Union[str, Sequence[str], None] = '3a264b8656d0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'payment_types',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(), nullable=False, unique=True),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('payment_types')
