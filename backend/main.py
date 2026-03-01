from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Asset Custody Agent API")

# Configuration for CORS (if needed locally, though Nginx will reverse proxy)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.environ.get("API_KEY", "")

@app.get("/")
def read_root():
    return {"message": "Backend API is running"}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/chat")
async def proxy_to_llm(request: Request):
    # This endpoint proxies the LLM call using the backend API key
    payload = await request.json()
    # Mock response or actual LLM call here, using API_KEY
    if not API_KEY:
        return {"error": "API_KEY not configured on backend."}
    
    # Normally you would call your LLM here:
    # return call_llm(payload, api_key=API_KEY)
    
    return {
        "reply": f"Mock LLM response for: {payload.get('message', '')} (Secured via Backend)"
    }
