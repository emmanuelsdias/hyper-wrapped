from pydantic import BaseModel


class CategorySchema(BaseModel):
    mcc: int
    category_description: str

    class Config:
        from_attributes = True