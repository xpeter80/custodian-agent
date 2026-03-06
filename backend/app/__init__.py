from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .instructions.routes import router as instructions_router
from .chat.routes import router as chat_router
from .monitoring.manual_stuck import router as manual_stuck_router


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(title="Asset Custody Agent API")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def read_root():
        return {"message": "Backend API is running"}

    @app.get("/api/health")
    def health_check():
        return {"status": "ok"}

    app.include_router(instructions_router)
    app.include_router(chat_router)
    app.include_router(manual_stuck_router)

    return app


settings = get_settings()
app = create_app()

