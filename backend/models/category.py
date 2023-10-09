from sqlalchemy import Column, Integer, String
from database import Base


class Category(Base):
    __tablename__ = "categories"

    mcc = Column(Integer, primary_key=True, index=True)
    
    category_description = Column(String)