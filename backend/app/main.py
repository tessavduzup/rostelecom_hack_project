import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routes import projects
from fastapi import Request
import traceback
import logging

app = FastAPI(title="РТК Аналитика",
    version="0.0.1", debug=True)

logger = logging.getLogger("debug")

@app.middleware("http")
async def debug_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        tb = traceback.format_exc()
        print("=== ОШИБКА ===")
        print(tb)
        logger.error(f"Ошибка при обработке {request.url}: {e}\n{tb}")
        raise e






app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.add_middleware(AuditMiddleware)

app.include_router(projects.router)
# app.include_router(auth.router)