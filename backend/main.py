import sys
sys.dont_write_bytecode = True # prevents __pycache__ folders

from fastapi import FastAPI

from database import Base, engine
from routes import user, trend


app = FastAPI()
Base.metadata.create_all(bind=engine)

app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(trend.router, prefix="/trend", tags=["Trend"])