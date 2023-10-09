from pydantic import BaseModel


class Category(BaseModel):
    mcc: int
    category_description: str

    class Config:
        from_attributes = True