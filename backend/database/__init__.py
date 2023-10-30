from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

user = 'postgres'
password = 'postgres'
hostname = 'localhost'
port = '5432'
databasename = 'hyper-wrapped-db'

URL_DATABASE = f'postgresql://{user}:{password}@{hostname}:{port}/{databasename}'

engine = create_engine(URL_DATABASE)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()