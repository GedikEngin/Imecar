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