from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/poseidon/ask")
async def poseidon_ask(req: PromptRequest):
    # Dummy response for now — replace with real logic
    return {
        "response": f"Poseidon received: {req.prompt}",
        "suggestions": []
    }

@app.get("/")
def root():
    return {"message": "Poseidon API is live"}
