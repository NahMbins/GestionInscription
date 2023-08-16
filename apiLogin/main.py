from fastapi import FastAPI
from models import  User
from mongoengine import connect
import json
from fastapi import Query
from mongoengine.queryset.visitor import Q
from pydantic import BaseModel
from fastapi import Body, HTTPException
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends
from datetime import timedelta, datetime
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
connect(db="inscription", host="mongodb+srv://admin:admin@cluster0.vxi3fyo.mongodb.net/?retryWrites=true&w=majority")

#Middleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# token

class NewUser(BaseModel):
    username: str
    password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def get_password_hash(password):
    return pwd_context.hash(password)

@app.post("/sign_up")
def sign_up(new_user: NewUser):
    user = User(username=new_user.username,
        password=get_password_hash(new_user.password)
        )
    user.save()
    return {"message":"New user created successfully"}

# ################################################### #



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def authenticate_user(username, password):
    try:
        user = json.loads(User.objects.get(username=username).to_json())
        password_check = pwd_context.verify(password, user['password'])
        return password_check
    except User.DoesNotExist:
        return False

SECRET_KEY = '622acf06efc773866710b7ace57ce5e1f886579a243cf57962ab24139beb588c'
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password

    if authenticate_user(username, password):
        access_token = create_access_token(
                        data={"sub":username}, expires_delta=timedelta(minutes=30)
        )
        
        return {access_token}
    
    else:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

@app.get("/home")
def home(token: str = Depends(oauth2_scheme)):
    return {"token":token}

