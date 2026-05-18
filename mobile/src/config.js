// Point this at your running FastAPI server
// For local dev: 'http://localhost:8000'
// For physical device: use your machine's LAN IP, e.g. 'http://192.168.1.X:8000'
export const API_BASE = process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:8000';
