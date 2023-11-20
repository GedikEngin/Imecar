from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# basic api for fast api
from pydantic import BaseModel # used for data type validation

app = FastAPI()
# creates app

class Data(BaseModel): # defines the type of data we are trying to accept, in json/request body etc. auto performs validation to make sure date types are matching
    name: str

# how to accept requests, json data

@app.post("/create/")
async def create(data: Data): # gets auto accepted in base body as json due to pydantic
    return{"data": data}


#getting endpoint
@app.get("/test/") # @app refers to our application from FastAPI, .get defines the route that handles HTTP GET requests, in this case from the "/test/" end point of the FastAPI application
async def test(item_id:str, query:int = 1): # asynchronous function that can wait for other processes to be completed internally, such as waiting on web responses, or other operations to be completed
    # item_id is a path parameter, defined as string. FastAPI can attempt to infer but it is better practice to state it
    # if it is query:int = 1, it means its optional, query variable is of integer type
    return{"hello":item_id}

# to run uvicorn <file contained within>.<name of python file>:<name of application where you run FastAPI from> --reload
# uvicorn FastAPI.main:app --reload
# to access web server:
# http://127.0.0.1:8000/docs


