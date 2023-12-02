from fastapi import FastAPI, Body, Path, Query, HTTPException
# path is used for validating path parameters
# query is used for validating query parameters
from typing import Optional
from pydantic import BaseModel, Field # framework for validation & the model for validation, imports field for setting constraints
from starlette import status # fast api is built using starlette, you can dictate what status is returned after every api endpoint 

app = FastAPI()


class Book():
    id: int
    title: str
    author: str
    description: str
    rating: int
    published_date: int

    def __init__(self, id, title, author, description, rating, published_date):
        self.id = id
        self.title = title
        self.author = author
        self.description = description
        self.rating = rating
        self.published_date = published_date


class BookRequest(BaseModel): # user gets unprocessable entity, meaning that it does not match the specification given
    id: Optional[int] # if pydantic2, id: Optional[int] = None, it makes it so id can be int, or null value
    title: str = Field(min_length=3)
    author: str = Field(min_length=1)
    description: str = Field(min_length = 1, max_length = 100)
    rating: int = Field(gt=0, lt=6) # greater than & less than, they are not exlcusive so rating can take 1, 2 , 3 , 4 , 5
    # data validation takes place before it is transfererd into an appendable object at function <async def create_book(book_request: BookRequest):>
    published_date: int = Field(max_length=4)


    class Config:
        json_schema_extra = {  # pydantic2 requires json_schema_extra = {}
            "example": { # as we have this as the default entry, there is no need to have the ID field either as we auto increment it, and the user wont have to input it either
                "title" : "A new book",
                "author": "codingwithroby",
                "description": "a new description",
                "rating": 3,
                'published_date': 2013
            }
        }

# the books database
BOOKS = [
    Book(1, "Computer Science Pro", "codingwithroby", "A very nice book!", 5, 2013),
    Book(2, "Be Fast with FastAPI", "codingwithroby", "A great book!", 5, 2010),
    Book(3, "Master Endpoints", "codingwithroby", "A awesome book!", 5, 2009),
    Book(4, "HP1", "Author 1", "Book Description", 2, 1981),
    Book(5, "HP2", "Author 2", "Book Description", 3, 2003),
    Book(6, "HP3", "Author 3", "Book Description", 1, 2013) 
]

@app.get("/books/", status_code=status.HTTP_200_OK) # gets all books
async def read_all_books():
    return BOOKS


@app.get("/books/{book_id}", status_code=status.HTTP_200_OK) # searching by book id
async def read_book_by_id(book_id: int = Path(gt=0)): # Path has to be greater than 0
    # books id will be path parameter greater than 0 or error flag is raised, it adds extra validation to path paremeters
    for book in BOOKS:
        if book.id == book_id:
            return book
    raise HTTPException(status_code=404, detail="item not found")


@app.get("/books/by_rating/", status_code=status.HTTP_200_OK) # searches through ratings
async def read_book_by_rating(book_rating: int = Query(gt=0, lt=6)): # specift query when using query constraints/validation
    books_to_return = []
    for book in BOOKS:
        if book.rating == book_rating:
            books_to_return.append(book)
    return books_to_return


@app.get("/books/published_date/", status_code=status.HTTP_200_OK) # searches through release date
async def read_books_by_publish_date(published_date: int):
    books_to_return = []
    for book in BOOKS:
        if book.published_date == published_date:
            books_to_return.append(book)
    return books_to_return


# post without the data validation
# @app.post("/create_book"/)
# async def create_book(book_request=Body()): # makes book request a body type input by default, but it does not have any validation by default
#     added_book = BOOKS.append(book_request)
#     return added_book

@app.post("/create_book/", status_code = status.HTTP_201_CREATED)
async def create_book(book_request: BookRequest): # the book request now has to obey the data validation/constrains placed on it from the class it inherits from
    new_book = Book(**book_request.dict()) # ** means it passes key values from BookRequest() into Book() constructor, .dict attempts to convert data into dictionary
    # new_book = Book(**book_request.model_dump()) # same as func above, just for newer pydantic versions
    BOOKS.append(find_book_id(new_book)) # calls the book id function to auto assign the id for the book being appended

# auto incrementing id
def find_book_id(book: Book):

    book.id = 1 if len(BOOKS) == 0 else BOOKS[-1].id + 1 # short hand way of writiing what is below it

    # if len(BOOKS) > 0: # checks if the amount of entries in BOOKS <database> is greater than 0, making sure entries exist
    #     book.id = BOOKS[-1].id + 1 # sets book id to be 1 greater than the id of the last entry in BOOKS
    # else:
    #     book.id = 1 # else it sets the book id to be 1 as there is no other entry present

    return book
    # it overrides the id being passed from the Body of the application


@app.put("/books/update_book/", status_code = status.HTTP_204_NO_CONTENT)
async def update_book(book: BookRequest):
    book_changed = False
    for i in range(len(BOOKS)):
        if BOOKS[i].id == book.id:
            BOOKS[i] = book
            book_changed = True
    if not book_changed:
        raise HTTPException(status_code=404, detail="item not found")


@app.delete("/books/book_id/{book_id}", status_code = status.HTTP_204_NO_CONTENT)
async def delete_book(book_id: int = Path(gt=0)):
    book_deleted = False
    for i in range(len(BOOKS)):
        if BOOKS[i].id == book_id:
            BOOKS.pop(i)
            book_deleted = True
            break
    if not book_deleted:
        raise HTTPException(status_code=404, detail="item not found")
