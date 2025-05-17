from fastapi import FastAPI
from fastapi.routing import APIRouter
from poseidon_ai_service import ask_poseidon
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@router.post("/ask")
async def poseidon_ask(req: PromptRequest):
    response = ask_poseidon(req.prompt)
    return {"response": response}

# Mount the router under /poseidon
app.include_router(router, prefix="/poseidon")
