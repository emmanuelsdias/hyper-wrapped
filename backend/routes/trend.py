from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from controllers import category_controller, transaction_controller, trend_controller
from database.db import get_db
from schemas.trend import BiggestSpending, MonthlyOverview, DailyAverageOverview, MostFrequentCategories, MostExpensiveCategories


router = APIRouter()


@router.get("/biggest-spending/{user_id}/{year}", response_model=BiggestSpending)
def monthly_overview(
    user_id: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    biggest_spending = transaction_controller.get_biggest_spending(db, user_id, year)
    return biggest_spending


@router.get("/monthly-overview/{user_id}/{year}", response_model=MonthlyOverview)
def monthly_overview(
    user_id: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    monthly_summary = trend_controller.get_monthly_overview(db, user_id, year)
    return monthly_summary


@router.get("/daily-average-overview/{user_id}/{year}", response_model=DailyAverageOverview)
def daily_average_overview(
    user_id: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    daily_summary = trend_controller.get_daily_average_overview(db, user_id, year)
    return daily_summary


@router.get("/most-frequent-categories/{user_id}/{year}", response_model=MostFrequentCategories)
def most_frequent_categories(
    user_id: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    top_categories = category_controller.get_most_frequent_categories(db, user_id, year)
    return top_categories


@router.get("/most-expensive-categories/{user_id}/{year}", response_model=MostExpensiveCategories)
def most_expensive_categories(
    user_id: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    top_categories = category_controller.get_most_expensive_categories(db, user_id, year)
    return top_categories
