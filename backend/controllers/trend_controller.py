from sqlalchemy import func, cast, Numeric
from sqlalchemy.orm import Session

from models.transaction import Transaction
from schemas.trend import MonthlyOverview, DailyAverageOverview


def get_monthly_overview(db: Session, user_id: int, year: int) -> MonthlyOverview:
    """
    Returns a dictionary of total amount spent by month for a given year.
    """
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
    monthly_summary_dict = {month: total for month, total in monthly_summary}

    # Fill in missing months with zero spending
    for month in range(1, 13):
        if month not in monthly_summary_dict:
            monthly_summary_dict[month] = 0

    # Create a MonthlyOverview object and return
    monthly_overview = MonthlyOverview(
        monthly_summary=monthly_summary_dict
    )
    return monthly_overview


def get_daily_average_overview(db: Session, user_id: int, year: int) -> DailyAverageOverview:
    """
    Returns a dictionary of average amount spent by day in a given year.
    """
    # Query to calculate the sum of amounts for each day
    daily_summary = (
        db.query(
            Transaction.day, 
            cast(func.sum(Transaction.amount), Numeric(10, 0)).label('total')
        )
        .filter(Transaction.user_id == user_id, Transaction.year == year)
        .group_by(Transaction.day)
        .all()
    )

    # Convert the result to a dictionary
    daily_summary_dict = {day: total for day, total in daily_summary}

    # Fill in missing months with zero spending
    for day in range(1, 32):
        if day not in daily_summary_dict:
            daily_summary_dict[day] = 0

    # Count the number of occurrences of each day in a year:
    # Days 1-28 happen 12 times
    # Day 29 happens 11 or 12 times
    # Day 30 happens 11 times
    # Day 31 happens 7 times
    day_occurrence = [12] * 28 + [11] * 2 + [7]
    if year % 4 == 0 and year % 100 != 0 or year % 400 == 0:
        day_occurrence[28] = 12 # Leap year has 12 occurrences of day 29 

    # Calculate the average spending for each day
    for day in range(1, 32):
        daily_summary_dict[day] = round(daily_summary_dict[day] / day_occurrence[day - 1])

    # Create a DailyAverageOverview object and return
    daily_average_overview = DailyAverageOverview(
        daily_summary=daily_summary_dict
    )
    return daily_average_overview