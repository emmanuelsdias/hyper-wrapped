from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserBase, UserSchema


def get_user_information(db: Session, user_id: int) -> UserBase:
    # Query to find the user with given user_id
    user = (
        db.query(User)
        .filter(User.user_id == user_id)
        .first()
    )
    # If user is not found, raise an exception
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create a UserBase object and return
    user_info = UserBase(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name
    )
    return user_info

# Dummy login function, since it shouldn't require username only
def login_with_username(db: Session, username: str) -> UserSchema:
    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )
    # If user is not found, raise an exception
    if not user:
        raise HTTPException(status_code=404, detail="Username not found")
    
    # Create a UserSchema object and return
    user_info = UserSchema(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        user_id=user.user_id
    )
    return user_info
