from typing import Dict
from pydantic import BaseModel


class MonthlyOverview(BaseModel):
    monthly_summary: Dict[int, float]


class DailyAverageOverview(BaseModel):
    daily_summary: Dict[int, float]
