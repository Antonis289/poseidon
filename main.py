from fastapi import FastAPI
from fastapi.routing import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import random

from poseidon_ai_service import ask_poseidon, ask_bond_coach
from bond_data import WORKOUT_PLAN, STYLE_GUIDE, MINDSET_TIPS, COCKTAILS

app = FastAPI(title="Bond Transformation API")

router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Legacy Poseidon endpoint ---

class PromptRequest(BaseModel):
    prompt: str

@router.post("/ask")
async def poseidon_ask(req: PromptRequest):
    response = ask_poseidon(req.prompt)
    return {"response": response}

app.include_router(router, prefix="/poseidon")


# --- Bond Transformation endpoints ---

bond_router = APIRouter()

class CoachRequest(BaseModel):
    message: str
    history: list = []

@bond_router.post("/coach")
async def bond_coach(req: CoachRequest):
    response = ask_bond_coach(req.message, req.history)
    return {"response": response}

@bond_router.get("/workout/today")
async def get_today_workout():
    day = datetime.now().strftime("%A").lower()
    workout = WORKOUT_PLAN.get(day, WORKOUT_PLAN["sunday"])
    return {"day": day.capitalize(), "workout": workout}

@bond_router.get("/workout/week")
async def get_week_workout():
    return {"plan": WORKOUT_PLAN}

@bond_router.get("/style")
async def get_style_guide():
    return {"style": STYLE_GUIDE}

@bond_router.get("/mindset/daily")
async def get_daily_mindset():
    tip = random.choice(MINDSET_TIPS)
    return {"tip": tip}

@bond_router.get("/mindset/all")
async def get_all_mindset():
    return {"tips": MINDSET_TIPS}

@bond_router.get("/cocktails")
async def get_cocktails():
    return {"cocktails": COCKTAILS}

@bond_router.get("/cocktails/{name}")
async def get_cocktail(name: str):
    match = next((c for c in COCKTAILS if c["name"].lower().replace(" ", "-") == name.lower()), None)
    if not match:
        return {"error": "Cocktail not found"}
    return {"cocktail": match}

app.include_router(bond_router, prefix="/bond")
