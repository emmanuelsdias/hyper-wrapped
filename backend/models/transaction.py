from sqlalchemy import Column, Float, ForeignKey, Integer, String
# from sqlalchemy.orm import relationship

from database import Base
from models.category import Category
from models.user import User


class Transaction(Base):
    __tablename__ = 'transactions'

    transaction_id = Column(Integer, primary_key=True, index=True)
    
    user_id = Column(Integer, ForeignKey(User.user_id))
    card = Column(Integer)
    year = Column(Integer)
    month = Column(Integer)
    day = Column(Integer)
    time = Column(String)
    amount = Column(Float)
    use_chip = Column(String)
    merchant_city = Column(String)
    merchant_state = Column(String)
    zip = Column(String)
    mcc = Column(Integer, ForeignKey(Category.mcc))
    errors = Column(String)
    is_fraud = Column(String)

    # user = relationship("User", back_populates="transactions")
    # category = relationship("Category", back_populates="transactions")