from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from controllers import user_controller
from database.db import get_db
from schemas.user import UserBase, UserSchema


router = APIRouter()


@router.get("/{user_id}", response_model=UserBase)
def get_user_info(
    user_id: int,
    db: Session = Depends(get_db)
):
    return user_controller.get_user_information(db, user_id)


@router.post("/login/{username}", response_model=UserSchema)
def user_login(
    username: str,
    db: Session = Depends(get_db)
):
    return user_controller.login_with_username(db, username)