from sqlalchemy import Column, Integer, String

from database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)

    username = Column(String(80), unique=True, index=True)
    first_name = Column(String(80))
    last_name = Column(String(80))