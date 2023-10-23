from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from controllers import trend_controller
from database.db import get_db
from schemas.trend import MonthlyOverview


router = APIRouter()


@router.get("/monthly-overview/{user_id}/{year}", response_model=MonthlyOverview)
def monthly_overview(
    user_id: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    monthly_summary = trend_controller.get_monthly_overview(db, user_id, year)
    return monthly_summary
