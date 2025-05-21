from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, receipts

def create_app() -> FastAPI:
    app = FastAPI(
        title="Expense Tracker API",
        description="Routes for various functionalities of expense tracker API",
        version="0.0.1",
        terms_of_service="https://github.com/sourasishbasu/meowney/README.md",
        license_info={
            "name": "Apache 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health", tags=["health"], summary="Check API health status")
    def health():
        return {"health": "ok"}

    app.include_router(auth.router)
    app.include_router(receipts.router)

    return app