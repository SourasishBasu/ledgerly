from pydantic import BaseModel
from typing import Optional
from datetime import date

class UpdateCreds(BaseModel):
    username: Optional[str]
    password: Optional[int]
    email: Optional[str]

class Expenses(BaseModel):
    date: date
    category: str
    vendor: str
    amount: float
