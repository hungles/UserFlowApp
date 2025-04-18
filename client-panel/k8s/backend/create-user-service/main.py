from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate
from typing import List

# Create tables in the database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware for frontend (allow React app to make requests from port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React runs on port 3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint to register a new user
@app.post("/api/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if the email is already registered
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create a new user and add to the database
    new_user = User(username=user.username, email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Return success message
    return {"message": "User created successfully"}

# Endpoint to get all users
@app.get("/api/users", response_model=List[UserCreate])
def get_users(db: Session = Depends(get_db)):
    # Retrieve all users from the database
    users = db.query(User).all()
    return users