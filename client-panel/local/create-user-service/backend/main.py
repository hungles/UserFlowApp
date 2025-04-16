from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine, Base
from models import User
from schemas import UserCreate
from typing import List

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS para frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React corre en el 3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependencia para obtener sesión
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Verificar si el email ya está registrado
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")

    new_user = User(username=user.username, email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Usuario creado con éxito"}

@app.get("/api/users", response_model=List[UserCreate])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
