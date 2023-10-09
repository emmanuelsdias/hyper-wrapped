from typing import Dict
from pydantic import BaseModel


class MonthlyOverview(BaseModel):
    monthly_summary: Dict[str, float]
