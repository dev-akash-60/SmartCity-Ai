
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.air_quality import router as air_quality_router

app = FastAPI(
    title="Smart City AI API",
    description=(
        "An intelligent platform for monitoring "
        "and predicting major urban challenges."
    ),
    version="1.0.0",

    
)

app.include_router(air_quality_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Smart City AI API is running",
        "status": "healthy",
        "modules": [
            "air_quality",
            "traffic",
            "flood_prediction",
            "water_management",
            "waste_management",
            "city_risk_engine",
        ],
    }


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
