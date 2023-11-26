import string
from fastapi import FastAPI, Body

# uvicorn FastAPI.udemy_course.own_code.books:app --reload

app = FastAPI()


BOOKS = [
    {"title": "Title One", "author": "Author One", "category": "science"},
    {"title": "Title Two", "author": "Author Two", "category": "science"},
    {"title": "Title Three", "author": "Author Three", "category": "history"},
    {"title": "Title Four", "author": "Author Four", "category": "math"},
    {"title": "Title Five", "author": "Author Five", "category": "math"},
    {"title": "Title Six", "author": "Author Two", "category": "math"}
]


@app.get("/books")  # specifies the url/path the functions below will work for, CRUD: read equivalent. a decorative
async def read_all_books():
    return BOOKS

# example to see ordering 
# @app.get("/bookbs/mybook")
# async def read_all_books():
#     return {"book_title": "my favorite book!"}


@app.get("/books/{book_title}")
async def read_all_book(book_title: str):  # dynamic_param must be a string
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold():
            return book
        

@app.get("/books/") # goes through the books, and then if they exist and match query adds it to list and returns it, i.e. ?category=science
async def read_category_by_query(category:str):
    books_to_return = []
    for book in BOOKS:
        if book.get("category").casefold() == category.casefold():
            books_to_return.append(book)
    return books_to_return


@app.get("/books/{book_author}/")
async def read_category_by_query(book_author:str, category:str): # takes in author param and category param
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold() == book_author.casefold() and book.get("category").casefold() == category.casefold(): # checks if the author and category match
            books_to_return.append(book) # if they do it appends it to the list of books to return
    return books_to_return


@app.post("/books/create_book")
# when post is called, we want data inside body to be saved to new_book and add new_book to our BOOKS database/dict
async def create_book(new_book=Body()): # new book parameter will have default paramter Body()
    BOOKS.append(new_book) # adds new_book to the BOOKS "database"/dictionary


# if my book matches first func,
# if last variable is different in func, dynamic param catches it

# have function, explicityly state type will be string
# for book in books, looping through all the BOOKS
# .casefold is a more aggressive/dominant .lower function
# uvicorn FastAPI.udemy_course.own_code.books:app --reload

BOOKS = [
    {"title": "Title One", "author": "Author One", "category": "science"},
    {"title": "Title Two", "author": "Author Two", "category": "science"},
    {"title": "Title Three", "author": "Author Three", "category": "history"},
    {"title": "Title Four", "author": "Author Four", "category": "math"},
    {"title": "Title Five", "author": "Author Five", "category": "math"},
    {"title": "Title Six", "author": "Author Two", "category": "math"}
]

@app.get("/books")  # specifies the url/path the functions below will work for, CRUD: read equivalent. a decorative
async def read_all_books():
    return BOOKS

# example to see ordering 
# @app.get("/bookbs/mybook")
# async def read_all_books():
#     return {"book_title": "my favorite book!"}


@app.get("/books/{book_title}")
async def read_all_book(book_title: str):  # dynamic_param must be a string
    for book in BOOKS:
        if book.get("title").casefold() == book_title.casefold():
            return book
        

# if my book matches first func
# if last variable is different in func, dynamic param catches it


@app.get("/books/") # goes through the books, and then if they exist and match query adds it to list and returns it, i.e. ?category=science
async def read_category_by_query(category:str):
    books_to_return = []
    for book in BOOKS:
        if book.get("category").casefold() == category.casefold():
            books_to_return.append(book)
    return books_to_return


@app.get("/books/{book_author}/")
async def read_category_by_query(book_author:str, category:str): # takes in author param and category param
    books_to_return = []
    for book in BOOKS:
        if book.get("author").casefold() == book_author.casefold() and book.get("category").casefold() == category.casefold(): # checks if the author and category match
            books_to_return.append(book) # if they do it appends it to the list of books to return
    return books_to_return

 # goes through the books, and then if they exist and match query adds it to list and returns it, i.e. ?category=science
@app.get("/books/by_author/{author}") # captures author path directly from user
async def read_author_by_author_path(author: str): # takes in author as a string
    books_to_return = [] # empty list 
    for book in BOOKS: # goes through the books indexing under book
        if book.get("author").casefold() == author.casefold(): # if index book matches other books with the same author append to list
            books_to_return.append(book)
    return books_to_return # return list at the end


@app.post("/books/create_book")
# when post is called, we want data inside body to be saved to new_book and add new_book to our BOOKS database/dict
async def create_book(new_book=Body()): # new book parameter will have default paramter Body()
    BOOKS.append(new_book) # adds new_book to the BOOKS "database"/dictionary

@app.put("/books/update_book") # PUT is equal to UPDATE from CRUD, allows you to change the information without touching title, i.e. author and category
async def update_book(updated_book=Body()):
    for i in range(len(BOOKS)):
        if BOOKS[i].get("title").casefold() == updated_book.get("title").casefold():
            BOOKS[i] = updated_book
# we pass body through put
# looping through all elements in book we want to update book in the specific index
# it allows you to update pieces of information internally


@app.delete("/books/delete_book/{book_title}")
async def delete_book(book_title:str): # for deleting books
    for i in range(len(BOOKS)): # goes through all elements in books
        if BOOKS[i].get('title').casefold() == book_title.casefold(): # checks if book at index matches the title put in by user via GET, and checks to match if it exists within db
            BOOKS.pop(i) # pops it out of the books db
            break






# have function, explicityly state type will be string
# for book in books, looping through all the BOOKS
# .casefold is a more aggressive/dominant .lower function
