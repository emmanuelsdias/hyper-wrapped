from sqlalchemy import func, cast, Numeric
from sqlalchemy.orm import Session

from models.transaction import Transaction
from schemas.trend import MonthlyOverview


def get_monthly_overview(db: Session, user_id: int, year: int) -> MonthlyOverview:
    # Query to calculate the sum of amounts for each month
    monthly_summary = (
        db.query(
            Transaction.month, 
            cast(func.sum(Transaction.amount), Numeric(10, 0)).label('total')
        )
        .filter(Transaction.user_id == user_id, Transaction.year == year)
        .group_by(Transaction.month)
        .all()
    )

    # Convert the result to a dictionary
    monthly_summary_dict = {str(month): total for month, total in monthly_summary}

    # Fill in missing months with zero spending
    for month in range(1, 13):
        if str(month) not in monthly_summary_dict:
            monthly_summary_dict[str(month)] = 0.0

    # Create a MonthlyOverview object and return
    monthly_overview = MonthlyOverview(
        monthly_summary=monthly_summary_dict
    )
    return monthly_overview
