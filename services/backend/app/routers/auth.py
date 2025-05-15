from fastapi import APIRouter, HTTPException, Form
from app.core.utils import hash_password, verify_password
from app.db.models import UserCreate, LoginRequest, users, receipts
from sqlmodel import select, extract, func
from app.routers.deps import SessionDep
from datetime import datetime
from uuid import uuid4


router = APIRouter(prefix="/auth", tags=["Authentication"])


def get_user_by_email(email: str, session: SessionDep) -> users | None:
    statement = select(users).where(users.email == email)
    session_user = session.exec(statement).first()
    return session_user


@router.post(
    "/register",
    summary="Register a new user",
    responses={
        201: {
            "description": "User registered successfully",
            "content": {"application/json": {"example": {"message": "User registered successfully", "user_id": "uuid"}}},
        },
        400: {
            "description": "User already exists",
            "content": {"application/json": {"example": {"detail": "User already exists"}}},
        },
        500: {
            "description": "Server error during user registration",
            "content": {"application/json": {"example": {"detail": "Error registering user: ERROR"}}},
        },
    },
)
def register_user(session: SessionDep, user: UserCreate = Form(...)):
    hashed_password = hash_password(user.password)
    uid = str(uuid4())
    try:
        existing_user = get_user_by_email(email=user.email, session=session)
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="User already exists",
            )

        new_user = users(
            user_id=uid,
            email=user.email,
            username=user.username,
            password=hashed_password,
        )
        session.add(new_user)
        session.commit()
        return {"message": "User registered successfully", "user_id": uid, "username": user.username}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Error registering user: {e}")


@router.post(
    "/login",
    summary="Authenticate user and return user_id with current month expenditure",
    responses={
        200: {
            "description": "Login successful",
            "content": {
                "application/json": {
                    "example": {
                        "message": "Login successful",
                        "user_id": "uuid",
                        "username": "exampleuser",
                        "budget": 5000,
                        "expenditure": 1200
                    }
                }
            },
        },
        401: {
            "description": "Invalid credentials",
            "content": {"application/json": {"example": {"detail": "Invalid credentials"}}},
        },
        500: {
            "description": "Server error during login",
            "content": {"application/json": {"example": {"detail": "Error logging in: some error"}}},
        },
    },
)
def login_user(session: SessionDep, loginrequest: LoginRequest = Form(...)):
    try:
        # Validate user credentials
        credentials = session.exec(
            select(users).where(users.email == loginrequest.email)
        ).first()

        if not credentials or not verify_password(loginrequest.password, credentials.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        current_month = datetime.now().month

        # Query sum of expenses for current month
        expenditure = session.exec(
            select(func.sum(receipts.total_amount))
            .where(
                receipts.user_id == credentials.user_id,
                extract("month", receipts.receipt_date) == current_month
            )
        ).one()

        total_expenditure = expenditure or 0

        return {
            "message": "Login successful",
            "user_id": credentials.user_id,
            "username": credentials.username,
            "budget": float(credentials.budget),
            "expenditure": float(total_expenditure),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging in: {e}")
