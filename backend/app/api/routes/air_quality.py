from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.air_quality_service import predict_air_quality


router = APIRouter(
    prefix="/api/air-quality",
    tags=["Air Quality"]
)


class AirQualityInput(BaseModel):
    City: str = Field(..., min_length=1)

    Month: int = Field(..., ge=1, le=12)
    DayOfWeek: int = Field(..., ge=0, le=6)

    PM2_5: float = Field(..., alias="PM2.5", ge=0)
    PM10: float = Field(..., ge=0)
    NO: float = Field(..., ge=0)
    NO2: float = Field(..., ge=0)
    NOx: float = Field(..., ge=0)
    NH3: float = Field(..., ge=0)
    CO: float = Field(..., ge=0)
    SO2: float = Field(..., ge=0)
    O3: float = Field(..., ge=0)
    Benzene: float = Field(..., ge=0)
    Toluene: float = Field(..., ge=0)


@router.post("/predict")
def predict_air_quality_endpoint(data: AirQualityInput):
    try:
        payload = data.model_dump(by_alias=True)
        result = predict_air_quality(payload)
        return result

    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc))

    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))