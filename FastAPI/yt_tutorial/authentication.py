from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import uvicorn


SECRET_KEY = "cb290c7c2368f6ea85f85c0b01dc04b4fe85854b971e770f39326fcd92bb9c9c" # establishing encoding key
ALGORITHM = "HS256" # type of encryption key
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # token expiry time

# creates users database using dictionary
db = {
    "engin": {
        "username": "engin",
        "full_name": "Engin Gedik",
        "email": "engin@gmail.com",
        "hashed_password": "$2b$12$rY.bXmeHMhLBkcHDqIl1IORhbTGMZFl2p8EERfjVcD76GTgMBUT2S",  # Updated hashed password
        "disabled": False
    }
}

class Token(BaseModel): # represents the structure of the access token
    access_token: str
    token_type: str

class TokenData(BaseModel): # represents structure of token with username property
    username: str or None = None # not required in token structure

class User(BaseModel): # represents user structure with username, emal, full_name and disabled user account
    username: str
    email: str or None = None # can be empty field
    full_name: str or None = None # can be empty field
    disabled: bool or None = None # can be empty field, toggles users activity, true or false

class UserInDB(User): # inherits from user, 
    hashed_password: str 
    # kept seperate from user so it is not directly associated with user
    # which gives you more freedom tocall user in general use case and is more suitable for security
    # also prevents hasehed password being returned evertime user is called, which is significantly more than password, better usage

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# past of CyrptContext, is used for hashing and verifying passwords
# scheme=["bcrypt"] specifies that the bcrypt algorithm will be used for hasing the password.
# it is slow and designed to be resistant to brute force attacks
# can easily be extended to adapt to increase in computing power
# has key stretching: multiple hashes that are controlled by a cost factor
# and has salt generation to enhance password security
# salt generation is combining random unique values and password to prevent identitcal attacks and increase password randomness
# CryptContext is used to also verify passwords during login operations
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# class provided by fast api
# is a way for a client to provide login details and to receive an access token directly
# with token clients can make authenticated requests to resources thay may require filtering of users and access
app = FastAPI() # initialises the FastAPI app

def verify_password(plain_password, hashed_password): # checks if the plain password and hashed password  match using verify function from CryptContext
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password): # hashes a plain password using the hash function in CryptContext
    return pwd_context.hash(password)

def get_user(db, username: str): # retreives user information from database
    if username in db: # checks if username entered by client is in database, the key part of the dictionary
        user_db = db[username] # assigns dictionary from db to user_db
        return UserInDB(**user_db) # ** is used to unpack dictionary info

def authenticate_user(db, username: str, password: str): # compares database values to the ones from login
    user = get_user(db, username) # uses get user to fetch info from db
    if not user:
        return False
    if not verify_password(password, user.hashed_password): # calls pasword checking function
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta or None = None): # creates the JWT access token
    # JSON Web Token is a compact URL-safe means of representing claims between two parties, used for authentication and authorisation
    # Allows for stateless authentication, where server does not need to follow the users session
    to_encode = data.copy() # copies data so inputs dont modify original data
    if expires_delta: # if its not False,
        expire = datetime.utcnow() + expires_delta # adds additional time to our expiry
    else:
        expire = datetime.utcnow() + timedelta(minutes=15) # if there is no expires_delta being passed in, then adds 15 minutes to current time

    to_encode.update({"exp": expire}) # updates token expirey time, adds new key-value pair
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)  # encodes the token with JWT lib and returns it
    return encoded_jwt

async def get_current_user(db, token: str = Depends(oauth_2_scheme)): 
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # attempts to decode the payload (unencrypted jwt token)
        username: str = payload.get("sub") # gets username from decoded payload
        if username is None: # checks if it doesnt exist
            raise credential_exception # raises flag
        token_date = TokenData(username=username) 
    except JWTError: # for any decoding error raises flag
        raise credential_exception
    user = get_user(db, username=token_date.username) # fetches decrypted tokens username
    if user is None: # checks existence
        raise credential_exception
    return user # if it exists returns it 

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)): # async func can wait for other async operations to be completed
    if current_user.disabled: # checks if account is active or not
        raise HTTPException(status_code=400, detail="Inactive user") # returns error if inactive
    return current_user # passes it through if it exists

@app.post("/token",tags=['main'] ,response_model=Token) # end point for FastAPI, handles HTTP POST requests at the /token path,
# And specifies type of response should match Token Model

async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()): # async function, expects data entry from OAuth2PasswordRequestForm
    # uses depends to extract the data from the request
    user = authenticate_user(db, form_data.username, form_data.password) # calls authenticate_user to verify the validity of username and password
    # the login details come from the webpage
    if not user: # if you do not match user 
        print("Incorrect username or password") # raises errors
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"} # bearer refers to the type of authentication being done
            #bearer is usually associated with token auth with OAuth2.0
        )
    
    # if no error flag is raised, it continues 
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)  # sets token expirey time to previously set parameters
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires) # creates an a
    print("Access token generated:", access_token) #prints the access token
    return {"access_token": access_token, "token_type": "bearer"}  # returns it to calling function&terminal

@app.get("/users/me/", response_model=User) # retrieves and handles HTTP GET requests for /users/me/ path, specifies the type of model to use

async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user # checks who the user is and returns them as current user

@app.get("/users/me/items", response_model=User)
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return User(**{"username": current_user.username, "email": current_user.email, "full_name": current_user.full_name, "disabled": current_user.disabled})
# retrieves information about authorised user and their items, and returns their relevant information as well as the state of their account


# generates hash password
# print(get_password_hash('engin'))

# to run through python for debugging
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

# to run through terminal
# uvicorn FastAPI.yt_tutorial.authentication:app --reload

