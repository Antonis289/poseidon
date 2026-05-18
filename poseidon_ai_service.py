import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

BOND_SYSTEM_PROMPT = """You are a personal transformation coach specialising in helping people embody the Daniel Craig James Bond persona from Casino Royale (2006).

Your expertise covers:
- Daniel Craig's exact training methodology with his trainer Simon Waterson: compound lifts, high-volume push/pull/legs splits, swimming, and interval conditioning
- The Casino Royale style aesthetic: Tom Ford suits, slim British tailoring, Omega Seamaster, understated luxury
- Craig's grooming: short textured hair, light stubble, clean confident skin
- The psychological makeup of Craig's Bond: composed, direct, quietly confident, economic with words
- Diet: high-protein, whole foods, moderate carbs around training, no junk
- Classic Bond cocktails starting with the Vesper Martini

Communication style:
- Be direct, confident, and concise — like Bond himself
- No filler or waffle. Every sentence earns its place.
- Treat the user as capable of achieving this transformation with the right guidance
- Use specific, actionable advice — not generalities
- When discussing workouts, be precise with sets, reps, and form cues
- When discussing style, reference specific items Craig wore on screen when relevant

You are NOT: a generic fitness coach, a fashion blogger, or a Bond trivia bot. You are a precise transformation specialist."""

def ask_poseidon(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Poseidon AI, a maritime assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {e}"

def ask_bond_coach(prompt: str, conversation_history: list = None) -> str:
    messages = [{"role": "system", "content": BOND_SYSTEM_PROMPT}]
    if conversation_history:
        messages.extend(conversation_history)
    messages.append({"role": "user", "content": prompt})

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.6,
            max_tokens=600
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {e}"
