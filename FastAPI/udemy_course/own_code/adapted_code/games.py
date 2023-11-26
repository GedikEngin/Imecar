# the purpose of this code is to attempt to implement things i learnt from the course into my own understanding and attempt to recreate it within a different scenario
# this one will be using games as opposed to books, and attempt to create its own CRUD operations in FastAPI

import string
from fastapi import FastAPI, Body, Query
# uvicorn FastAPI.udemy_course.own_code.adapted_code.games:app --reload

GAMES = [
    {"game_name": "Fallout 4", "developer": "Bethesda", "genre": "survival", "price": 60},
    {"game_name": "Fallout 76", "developer": "Bethesda", "genre": "survival", "price": 60},
    {"game_name": "Skyrim V", "developer": "Bethesda", "genre": "survival", "price": 10},
    {"game_name": "GTA V", "developer": "Rockstar", "genre": "shooter", "price": 60},
    {"game_name": "GTA IV", "developer": "Rockstar", "genre": "shooter", "price": 60},
    {"game_name": "Fortnite", "developer": "Epic Games", "genre": "shooter", "price": 0},
    {"game_name": "Minecraft", "developer": "Mojang", "genre": "survival", "price":10},
    {"game_name": "Runescape", "developer": "Jagex", "genre": "MMO", "price": 0},
    {"game_name": "Call of Duty Modern Warfare 1", "developer": "Treyarch", "genre": "shooter", "price": 50},
    {"game_name": "Call of Duty Modern Warfare 2", "developer": "Treyarch", "genre": "shooter", "price": 50},
    {"game_name": "Call of Duty Modern Warfare 3", "developer": "Treyarch", "genre": "shooter", "price": 50},
    {"game_name": "Civilisation 5", "developer": "Paradox Games", "genre": "strategy", "price": 25},
    {"game_name": "Civilisation 6", "developer": "Paradox Games", "genre": "strategy", "price": 25},
    {"game_name": "Cities Skylines: 1", "developer": "Paradox Games", "genre": "simulation", "price": 25},
    {"game_name": "Cities Skylines: 2", "developer": "Paradox Games", "genre": "simulation", "price": 25},
    {"game_name": "Fifa 23", "developer": "EA Sports", "genre": "sports", "price": 60},
    {"game_name": "Fifa 22", "developer": "EA Sports", "genre": "sports", "price": 60},
    {"game_name": "Ark Survival Evolved", "developer": "Wildcard Studios", "genre": "survival", "price": 60}
]

# functions to have:
# retrieve all games
# search by developer, genre, price (greater than or less than or equal to?)
# update prices
# update genres
# add new games
# remove games

# first step for almost everything, to be able to go through the db to be able to retrieve books

app = FastAPI()

# to get all books
@app.get("/games/", tags=["get"])
async def fetch_all_games():
    return GAMES

# gets game by game_name
@app.get("/games/game_name/{game_name}", tags=["get"])
async def fetch_game_by_game_name(game_name: str):
    for game in GAMES:
        if game.get('game_name').casefold() == game_name.casefold():
            return game


# gets games by genre
@app.get("/games/genre/{genre}", tags=["get"])
async def fetch_game_by_game_name(genre: str):
    return_games = []
    for game in GAMES:
        if game.get('genre').casefold() == genre.casefold():
            return_games.append(game)
    return return_games


# gets games by developer
@app.get("/games/developer/{developer}", tags=["get"])
async def fetch_game_by_game_name(developer: str):
    return_games = []
    for game in GAMES:
        if game.get('developer').casefold() == developer.casefold():
            return_games.append(game)
    return return_games


# gets games by price
# uses enumeration and Query to give droplist properties to more_less_equal
# makes it easier to interact and select price comparison with
@app.get("/games/price/{price}", tags=["get"])
async def fetch_game_by_game_name(price: int, more_less_equal: str = Query(enum = ("equal", "more", "less"))):
    return_games = []
    for game in GAMES:
        game_price = game.get('price')
        if more_less_equal == "equal" and game_price == price:
            return_games.append(game)
        elif more_less_equal == "more" and game_price > price:
            return_games.append(game)
        elif more_less_equal == "less" and game_price < price:
            return_games.append(game)
    return return_games


@app.post("/games/add_game_manual/", tags=["post"]) # allows user to add games free hand
async def add_game(add_game=Body()):
    GAMES.append(add_game)


@app.post("/games/add_game_gudied/", tags=["post"]) # allows users to add games with ui aid
async def add_game(input_name: str, input_developer: str, input_genre: str, input_price: int):
    new_game = { # creates new dictionary entry
        "game_name": input_name,
        "developer": input_developer,
        "genre": input_genre,
        "price": input_price
    }
    GAMES.append(new_game) # passes it into GAMES dictionary
    return (new_game)


@app.put("/games/update_game_manual/", tags=["put"]) # updates games based on title matching and full user entry
async def update_game(updated_game=Body()):
    for i in range(len(GAMES)):
        if GAMES[i].get("game_name").casefold() == updated_game.get("game_name").casefold():
            GAMES[i] = updated_game
    return updated_game


@app.put("/games/update_game_guided/", tags=["put"]) # allows users to add games with ui aid
async def add_game(game_to_update: str, input_developer: str, input_genre: str, input_price: int):
    for i in range(len(GAMES)):
        if GAMES[i].get("game_name").casefold() == game_to_update.casefold():
            GAMES[i]["developer"] = input_developer
            GAMES[i]["genre"] = input_genre
            GAMES[i]["price"] = input_price


@app.delete("/games/delete_game_title/{game_name}", tags=["delete"]) # deletes games based on their titles
async def delete_game(game_name: str):
    for i in range(len(GAMES)):
        if GAMES[i].get("game_name").casefold() == game_name.casefold():
            GAMES.pop(i)
            break


@app.delete("/games/delete_game_genre/{genre}", tags=["delete"]) # removes games based on thier genres
async def delete_game(genre: str):
    games_to_remove = []
    for game in GAMES:
        if game.get("genre").casefold() == genre.casefold():
            games_to_remove.append(game)

    for game_to_remove in games_to_remove:
        if game_to_remove["genre"].casefold() == genre.casefold():
            GAMES.remove(game_to_remove)
            

# go through dictionary
# if the game that youre looking at matches the genre provided by the user, remove it from dictionary
# keep going through the dictionary
# remove game from dictionary if the genre matches user provided one


    # games_to_remove = [game for game in GAMES if game.get("genre").casefold() == genre.casefold()]

    # for game in games_to_remove:
    #     GAMES.remove(game)

    # response_data = {"message": f"All {genre} games deleted", "remaining_games": GAMES}
    # return response_data

