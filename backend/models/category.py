from sqlalchemy import Column, Integer, String
from database import Base


class Category(Base):
    __tablename__ = "categories"

    mcc = Column(Integer, primary_key=True, index=True)
    
    general_description = Column(String)
    full_description = Column(String)