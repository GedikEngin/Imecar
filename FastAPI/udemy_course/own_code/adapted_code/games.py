# the purpose of this code is to attempt to implement things i learnt from the course into my own understanding and attempt to recreate it within a different scenario
# this one will be using games as opposed to books, and attempt to create its own CRUD operations in FastAPI

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
