from typing import Dict
from pydantic import BaseModel


class BiggestSpending(BaseModel):
    month: int
    day: int
    amount: float
    general_description: str
    full_description: str


class MonthlyOverview(BaseModel):
    monthly_summary: Dict[int, float]


class DailyAverageOverview(BaseModel):
    daily_summary: Dict[int, float]
