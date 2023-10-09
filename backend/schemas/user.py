from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str


class UserCreate(UserBase):
    # Additional fields if user creation logic needed
    # such as email, password hashes, auth token etc.
    pass


class User(UserCreate):
    user_id: int

    class Config:
        from_attributes = True