from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

# Allow frontend requests (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    id: int
    name: str
    email: str

class UserCreate(BaseModel):
    name: str
    email: str

# In-memory DB (replace with real DB later)
users: List[User] = []
next_id = 1

@app.get("/api/users", response_model=List[User])
def get_users():
    return users

@app.post("/api/users", response_model=User)
def add_user(user: UserCreate):
    global next_id
    new_user = User(id=next_id, name=user.name, email=user.email)
    users.append(new_user)
    next_id += 1
    return new_user

@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    global users
    updated = [user for user in users if user.id != user_id]
    if len(updated) == len(users):
        raise HTTPException(status_code=404, detail="User not found")
    users = updated
    return {"detail": "User deleted"}
