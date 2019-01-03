"""empty message

Revision ID: 8f295aebcd9f
Revises: e201cd43a98f
Create Date: 2018-12-17 17:00:31.350016

"""

# revision identifiers, used by Alembic.
revision = '8f295aebcd9f'
down_revision = 'e201cd43a98f'

from alembic import op
import sqlalchemy as sa


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('alert', sa.Column('alert_field', sa.String(length=250), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('alert', 'alert_field')
    # ### end Alembic commands ###
