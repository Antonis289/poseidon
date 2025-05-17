from fastapi import FastAPI
from pydantic import BaseModel
from poseidon_ai_service import ask_poseidon
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Optional: Allow CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/poseidon/ask")
async def poseidon_ask(req: PromptRequest):
    response = ask_poseidon(req.prompt)
    return {"response": response}
