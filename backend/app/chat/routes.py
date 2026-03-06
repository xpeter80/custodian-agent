from fastapi import APIRouter, Request

from ..config import get_settings


router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat")
async def proxy_to_llm(request: Request):
    settings = get_settings()
    payload = await request.json()

    if not settings.api_key:
        return {"error": "API_KEY not configured on backend."}

    return {
        "reply": f"Mock LLM response for: {payload.get('message', '')} (Secured via Backend)"
    }

