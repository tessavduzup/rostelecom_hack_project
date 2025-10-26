"""create costs table

Revision ID: 6b3166ed2fe0
Revises: 39e037ed023b
Create Date: 2025-10-25 10:02:55.592656

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6b3166ed2fe0'
down_revision: Union[str, Sequence[str], None] = '39e037ed023b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'costs',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('project_id', sa.Integer, sa.ForeignKey('projects.id'), nullable=False),
        sa.Column('year', sa.Integer, nullable=False),
        sa.Column('month', sa.Integer, nullable=False),
        sa.Column('amount', sa.Float, nullable=False),
        sa.Column('cost_article_id', sa.Integer, sa.ForeignKey('cost_articles.id'), nullable=False),
        sa.Column('cost_type_id', sa.Integer, sa.ForeignKey('cost_types.id'), nullable=False),
        sa.Column('reflection_status_id', sa.Integer, sa.ForeignKey('reflection_statuses.id'), nullable=False)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('costs')
