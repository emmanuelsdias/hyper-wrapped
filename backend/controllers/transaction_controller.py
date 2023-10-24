from fastapi import HTTPException
from sqlalchemy import cast, Numeric
from sqlalchemy.orm import Session

from models.category import Category
from models.transaction import Transaction
from schemas.trend import BiggestSpending


def get_biggest_spending(db: Session, user_id: int, year: int) -> BiggestSpending:
    """
    Returns the transaction with the biggest amount.
    """
    # Query to find the transaction with the biggest amount
    highest_transaction = (
        db.query(
            Transaction.month, 
            Transaction.day, 
            Transaction.amount, 
            Transaction.mcc,
            Category.general_description,
            Category.full_description
        )
        .join(
            Category, 
            cast(Transaction.mcc, Numeric) == cast(Category.mcc, Numeric)
        )
        .filter(
            Transaction.user_id == user_id, 
            Transaction.year == year
        )
        .order_by(Transaction.amount.desc())
        .first()
    )
    # If highest_transaction is not found, raise an exception
    if not highest_transaction:
        raise HTTPException(status_code=404, detail="No transactions found")

   # Create a BiggestSpending object and return
    biggest_spending = BiggestSpending(
        month=highest_transaction.month,
        day=highest_transaction.day,
        amount=highest_transaction.amount,
        general_description=highest_transaction.general_description,
        full_description=highest_transaction.full_description
    )
    return biggest_spending