from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:12345@localhost:5432/hackathon_rtk"
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

local_session = sessionmaker(autocommit = False, autoflush=False, bind=engine)

def get_db():
    db = local_session()
    try:
        yield db
    finally:
        db.close()