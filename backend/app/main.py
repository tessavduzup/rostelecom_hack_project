from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import projects, auth

app = FastAPI(title="РТК Аналитика",
    version="0.0.1", debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.add_middleware(AuditMiddleware)

app.include_router(projects.router)
app.include_router(auth.router)