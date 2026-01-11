from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# 1. Create the app
app = FastAPI()

# 2. Add CORS middleware BEFORE routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for React only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load your trained model
model = joblib.load("house_price_model.pkl")

class HouseData(BaseModel):
    feature1: float
    feature2: float
    feature3: float
    feature4: float
    feature5: float
    feature6: float
    feature7: float
    feature8: float

@app.post("/predict")
def predict_price(data: HouseData):
    # Convert input to numpy array
    features = np.array([[data.feature1, data.feature2, data.feature3,data.feature4,data.feature5,data.feature6,data.feature7,data.feature8,]])
    
    # Get prediction from model
    prediction = model.predict(features)
    
    # Return result as JSON
    return {"predicted_price": float(prediction[0])}