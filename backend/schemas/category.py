from pydantic import BaseModel


class CategorySchema(BaseModel):
    mcc: int
    general_description: str
    full_description: str

    class Config:
        from_attributes = True