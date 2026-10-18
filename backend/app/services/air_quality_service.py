from pathlib import Path

import joblib
import pandas as pd


MODEL_PATH = (
    Path(__file__).resolve().parents[1]
    / "models"
    / "air_quality"
    / "air_quality_model.joblib"
)

_model = None


def load_model():
    """Load the trained Air Quality pipeline once."""
    global _model

    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Air Quality model not found: {MODEL_PATH}"
            )

        _model = joblib.load(MODEL_PATH)

    return _model


def predict_air_quality(payload: dict) -> dict:
    """Predict AQI using the trained Random Forest pipeline."""

    model = load_model()

    # Read the exact feature names used during training.
    expected_features = list(model.feature_names_in_)

    input_data = pd.DataFrame([payload])

    missing_features = [
        feature
        for feature in expected_features
        if feature not in input_data.columns
    ]

    if missing_features:
        raise ValueError(
            f"Missing input features: {missing_features}"
        )

    # Ensure the input columns match the training order.
    input_data = input_data[expected_features]

    predicted_aqi = float(model.predict(input_data)[0])
    predicted_aqi = max(0.0, predicted_aqi)

    if predicted_aqi <= 50:
        category = "Good"
    elif predicted_aqi <= 100:
        category = "Satisfactory"
    elif predicted_aqi <= 200:
        category = "Moderate"
    elif predicted_aqi <= 300:
        category = "Poor"
    elif predicted_aqi <= 400:
        category = "Very Poor"
    else:
        category = "Severe"

    return {
        "predicted_aqi": round(predicted_aqi, 2),
        "category": category,
        "model": "Random Forest Regressor",
    }