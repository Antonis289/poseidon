import { BOND_SYSTEM_PROMPT } from '../data/bondData';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export async function askBondCoach(userMessages, apiKey) {
  if (!apiKey) {
    return "No API key set. Add your OpenAI key in Settings to unlock the AI coach.";
  }

  const messages = [
    { role: 'system', content: BOND_SYSTEM_PROMPT },
    ...userMessages,
  ];

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.65,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error('Invalid API key — check Settings.');
    if (res.status === 429) throw new Error('Rate limit hit. Wait a moment and try again.');
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
