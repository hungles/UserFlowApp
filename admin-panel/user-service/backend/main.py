from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Admin Panel - User Service")

# Mock database
users_db = []

# User model
class User(BaseModel):
    id: int
    name: str
    email: str
    is_active: bool

# Routes
@app.get("/users", response_model=List[User])
def get_all_users():
    """Get all users."""
    return users_db

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    """Get a user by ID."""
    user = next((user for user in users_db if user.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=User)
def create_user(user: User):
    """Create a new user."""
    if any(u.id == user.id for u in users_db):
        raise HTTPException(status_code=400, detail="User with this ID already exists")
    users_db.append(user)
    return user

@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, updated_user: User):
    """Update an existing user."""
    for index, user in enumerate(users_db):
        if user.id == user_id:
            users_db[index] = updated_user
            return updated_user
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    """Delete a user by ID."""
    global users_db
    users_db = [user for user in users_db if user.id != user_id]
    return {"detail": "User deleted successfully"}