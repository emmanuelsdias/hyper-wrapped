from typing import Dict, List
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


class CategoryFrequency(BaseModel):
    full_description: str
    general_description: str
    num_occurrences: int


class MostFrequentCategories(BaseModel):
    top_categories: List[CategoryFrequency]


class CategorySpending(BaseModel):
    full_description: str
    general_description: str
    total_amount: float


class MostExpensiveCategories(BaseModel):
    top_categories: List[CategorySpending]
