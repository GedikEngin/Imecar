from fastapi import FastAPI, Body, Path, Query, HTTPException
from typing import Optional
from pydantic import BaseModel, Field
from starlette import status

app = FastAPI() # creates the fast api app

class Game: # class creation and variable/parameters that the Games elements will have



    #constructor function for class, assigning variables that can be called within the class
    def __init__(self, game_id, game_name, game_dev, game_desc, game_rating, game_published, game_price):
        self.game_id = game_id
        self.game_name = game_name
        self.game_dev = game_dev
        self.game_desc = game_desc
        self.game_rating = game_rating
        self.game_published = game_published
        self.game_price = game_price

class GameRequest(BaseModel):
    game_id: Optional[int] # this is for request class so id can be optional as there are functions in place to auto increment it/assign values so user does not need to be involved in this field 
    game_name: str = Field(min_length=3)
    game_dev: str = Field(min_length=3)
    game_desc: str = Field(min_length=10)
    game_rating: int = Field(gt=-1, lt=6) # allows ratings to be between 0 and 5, under the assumption that the game can be really poor
    game_published: int = Field(max_length=4, gt=1900) # forces game to be between 1900 onwards and 4 digit year
    game_price: int = Field(gt=0)

    class Config:
        json_schema_extra = {
            "example":{
                "game_name": "game name",
                "game_dev": "studio that developed the game",
                "game_desc": "a brief description of the game",
                "game_rating": 3,
                "game_published": 2000,
                "game_price": 10
            }
        }

#GAMES are a list of elements that are structured by the Game class
GAMES = [
    Game(1, "Fallout 4", "Bethesda", "a survival game", 4, 2015, 60),
    Game(2, "The Elder Scrolls V: Skyrim", "Bethesda", "an open-world RPG", 5, 2011, 40),
    Game(3, "Fallout: New Vegas", "Obsidian Entertainment", "an RPG", 3, 2010, 30),
    Game(4, "The Witcher 3: Wild Hunt", "CD Projekt", "an action RPG", 0, 2015, 50),
    Game(5, "Far Cry 4", "Ubisoft", "a first-person shooter", 1, 2014, 45),
    Game(6, "Mass Effect 2", "BioWare", "an action RPG", 3, 2010, 35),
    Game(7, "Red Dead Redemption 2", "Rockstar Games", "an action-adventure", 5, 2018, 70),
    Game(8, "Dark Souls III", "FromSoftware", "an action RPG", 5, 2016, 55),
    Game(9, "Borderlands 2", "Gearbox Software", "a first-person shooter", 4, 2012, 40),
    Game(10, "Doom (2016)", "id Software", "a first-person shooter", 0, 2016, 50),
    Game(11, "BioShock Infinite", "Irrational Games", "a first-person shooter", 5, 2013, 45),
    Game(12, "The Last of Us", "Naughty Dog", "an action-adventure", 2, 2013, 60),
    Game(13, "Dragon Age: Inquisition", "BioWare", "an action RPG", 1, 2014, 55),
    Game(14, "Star Wars Jedi: Fallen Order", "Respawn Entertainment", "an action-adventure", 4, 2019, 65),
    Game(15, "Metro Exodus", "4A Games", "a first-person shooter", 3, 2019, 50),
    Game(16, "Assassin's Creed Odyssey", "Ubisoft", "an action RPG", 3, 2018, 55),
    Game(17, "Divinity: Original Sin 2", "Larian Studios", "a role-playing game", 5, 2017, 60),
    Game(18, "Fortnite", "Epic Games", "a battle royale", 2, 2017, 0),
    Game(19, "Minecraft", "Mojang", "a sandbox", 5, 2011, 30),
    Game(20, "RuneScape", "Jagex", "a MMORPG", 1, 2001, 0),
    Game(21, "ARK: Survival Evolved", "Studio Wildcard", "a survival game", 1, 2017, 50),
    Game(22, "Civilization V", "Firaxis Games", "a strategy game", 5, 2010, 40),
    Game(23, "Civilization VI", "Firaxis Games", "a strategy game", 2, 2016, 60),
    Game(24, "Apex Legends", "Respawn Entertainment", "a battle royale", 5, 2019, 0),
    Game(25, "Genshin Impact", "miHoYo", "an action RPG", 3, 2020, 0)
]


# gets all books
@app.get("/GAME/", tags=["GET REQUESTS"], status_code=status.HTTP_200_OK)
async def read_all_games():
    return GAMES


# gets games based on id input
@app.get("/games/{game_id}", tags=["GET REQUESTS"], status_code=status.HTTP_200_OK)
async def read_game_by_id(game_id: int):
    for game in GAMES:
        if game.game_id == game_id:
            return game
    raise HTTPException(status_code=404, detail="item not found")


@app.get("/games/rating/", tags=["GET REQUESTS"], status_code=status.HTTP_200_OK)
async def read_by_game_rating(rating: int, more_less_equal: str = Query(enum = ("equal", "more", "less"))):
    return_games = []
    for game in GAMES:
        game_rating = game.game_rating
        if more_less_equal == "equal" and game_rating == rating:
            return_games.append(game)
        elif more_less_equal == "more" and game_rating > rating:
            return_games.append(game)
        elif more_less_equal == "less" and game_rating < rating:
            return_games.append(game)
    return return_games


@app.get("/games/price/", tags=["GET REQUESTS"], status_code=status.HTTP_200_OK)
async def read_by_game_price(price: int, more_less_equal: str = Query(enum = ("equal", "more", "less"))):
    return_games = []
    for game in GAMES:
        game_price = game.game_price
        if more_less_equal == "equal" and game_rating == price:
            return_games.append(game)
        elif more_less_equal == "more" and game_rating > price:
            return_games.append(game)
        elif more_less_equal == "less" and game_rating < price:
            return_games.append(game)
    return return_games

## 