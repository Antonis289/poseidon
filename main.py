from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from poseidon_ai_service import ask_poseidon  # Ensure this file is accessible

app = FastAPI()

# Enable CORS (adjust allow_origins in prod)
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
    response = await ask_poseidon(req.prompt)
    return {"response": response}
