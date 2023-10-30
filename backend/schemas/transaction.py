from pydantic import BaseModel
from typing import Literal


class TransactionBase(BaseModel):
    user_id: int
    card_id: int
    year: int
    month: int
    day: int
    time: str
    amount: float
    use_chip: Literal['Swipe Transaction', 'Online Transaction']
    merchant_city: str
    merchant_state: str
    zip: str
    mcc: int
    errors: str
    is_fraud: Literal['Yes', 'No']


class TransactionSchema(TransactionBase):
    transaction_id: int

    class Config:
        from_attributes = True
