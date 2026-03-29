# Water Quality Detection Web App

This document outlines the implementation plan for the Water Quality Detection web application. The goal is to build an app where users can authenticate via Firebase, input water quality parameters, get a prediction using a pre-trained ML model (`.pkl` files), and store the results in MongoDB.

## Architecture 

Since the ML models are in Python (`.pkl` format) but the provided MongoDB snippet is in Node.js, we will use a **Node.js + Python** architecture.

1.  **Frontend (React/Vite)**
    *   **Firebase Authentication**: We will utilize the provided Firebase config to implement Google Login and Email/Password Login.
    *   **Premium UI**: We will build a beautiful, modern, and dynamic UI for the authentication page and the prediction dashboard.
    *   **Dashboard**: A form to capture: `pH`, `Hardness`, `Solids`, `Chloramines`, `Sulfate`, `Conductivity`, `Organic_carbon`, `Trihalomethanes`, and `Turbidity`.
2.  **Backend (Node.js + Express)**
    *   **MongoDB Integration**: We will use the provided MongoDB credentials and Node.js setup snippet to connect to the cluster.
    *   **Prediction API (`/api/predict`)**: Receives the data from the frontend, spawns a Python script to execute the ML model prediction, and records the request/response along with the `userId` in MongoDB.
3.  **Machine Learning Script (Python)**
    *   A simple Python script (`predict.py`) that loads `D:\downloads\water_quality_model.pkl` and `D:\downloads\water_scaler.pkl`. Note: We will need Python installed on the machine along with `scikit-learn` and `pandas`.

## User Review Required

> [!IMPORTANT]
> **Python Environment**: The `.pkl` files require Python to run. Do you have Python installed on this Windows machine? We will need to run `pip install scikit-learn pandas` to ensure the model can be loaded correctly. If you'd prefer to use a Python-only backend (like Flask or FastAPI) instead of Node.js + Python, please let me know.

> [!WARNING]
> The model paths provided are `D:\downloads\water_quality_model.pkl` and `D:\downloads\water_scaler.pkl`. Are you sure these files exist at this exact path, and is it okay for our app to read directly from `D:\` drive? (If preferred, I can copy them to our project folder).

## Proposed Changes

---

### Backend (Node.js)

#### [NEW] `backend/server.js`
The main Express server. It will contain the MongoDB connection logic (using your snippet) and the Express routes.

#### [NEW] `backend/predict.py`
The Python script that will be invoked by `server.js`. It will take the water quality parameters as command-line arguments, load your scaler/model from `D:\downloads\`, and return the prediction (Drinkable or Not Drinkable).

#### [NEW] `backend/package.json`
Configuration for Node dependencies (`express`, `mongodb`, `cors`, `dotenv`).

---

### Frontend (React + Vite)

#### [NEW] `frontend/src/firebase.js`
Configuration for Firebase initialization using the credentials you provided.

#### [NEW] `frontend/src/App.jsx`
Routing between Login/Signup and the Prediction Dashboard.

#### [NEW] `frontend/src/components/Login.jsx`
Premium UI login page using Firebase Email/Password and Google Auth providers.

#### [NEW] `frontend/src/components/Dashboard.jsx`
The main application interface where the user enters water qualities and clicks "Predict".

#### [NEW] `frontend/src/index.css`
A comprehensive CSS file adding high-quality, modern, dynamic aesthetic (vibrant colors, glassmorphism, animations) keeping with premium web standards.

## Open Questions

1. Are you okay with the Node.js + Python hybrid architecture, or would you prefer a pure Python (Flask) backend since we have Python models?
2. Do you have a specific color scheme or design aesthetic in mind for the application (e.g. dark mode, medical/clean white and blue)?

## Verification Plan

### Automated Tests
1. Verify the Python script can load the `.pkl` models and make a mock prediction locally before connecting it to Node.js.

### Manual Verification
1. Run both frontend and backend servers.
2. Open the browser and test the Firebase authentication system.
3. Test predicting water quality and ensure the result shows on the dashboard.
4. Check MongoDB Atlas to confirm that the input constraints and predictions are correctly stored under the respective user ID.
