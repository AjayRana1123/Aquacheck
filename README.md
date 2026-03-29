# 💧 AquaCheck — AI-Powered Water Quality Detection System

AquaCheck is a full-stack web application that uses machine learning to predict whether water is safe for human consumption based on key physicochemical properties. Users input 9 measurable water parameters and receive an instant **drinkability prediction** powered by a pre-trained scikit-learn classification model.

---

## 🚀 Features

- 🔐 **Secure Authentication** — Firebase-powered login with Email/Password and Google OAuth
- 🤖 **AI Prediction Engine** — Pre-trained scikit-learn model invoked server-side via Python subprocess
- 📊 **Prediction History** — All analyses stored per-user in MongoDB Atlas, viewable in a history dashboard
- 🌐 **Deployment-Ready** — Environment variables used throughout; secrets never hardcoded in source code
- 📱 **Responsive UI** — Glassmorphism dark-mode design that works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) |
| Backend | Node.js, Express.js |
| ML Model | Python, scikit-learn, joblib, NumPy |
| Authentication | Firebase Auth (Email + Google) |
| Database | MongoDB Atlas |

---

## 📁 Project Structure

```
water_quality_detection/
├── backend/
│   ├── models/
│   │   ├── water_quality_model.pkl   # Trained ML classifier
│   │   └── water_scaler.pkl          # Feature scaler
│   ├── predict.py                    # Python ML inference script
│   ├── server.js                     # Express API server
│   ├── package.json
│   ├── requirements.txt              # Python dependencies
│   ├── .env                          # Secret credentials (not committed)
│   └── .env.example                  # Template for environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx         # Main prediction + history UI
│   │   │   └── Login.jsx             # Auth page
│   │   ├── firebase.js               # Firebase initialization
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                          # Frontend secrets (not committed)
│   └── .env.example                  # Template for environment variables
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- A Firebase project
- A MongoDB Atlas cluster

---

### 1. Clone the Repository

```bash
git clone https://github.com/AjayRana1123/Aquacheck.git
cd Aquacheck
```

---

### 2. Backend Setup

```bash
cd backend
npm install
pip install -r requirements.txt
```

Create a `.env` file (copy from the example):

```bash
cp .env.example .env
```

Fill in your values in `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
MONGO_DB_NAME=waterquality
```

Place your trained model files in `backend/models/`:
```
backend/models/water_quality_model.pkl
backend/models/water_scaler.pkl
```

Start the backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file (copy from the example):

```bash
cp .env.example .env
```

Fill in your values in `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔬 Water Quality Parameters

The model uses the following 9 input features:

| Parameter | Unit | Description |
|---|---|---|
| pH | 0–14 | Acidity/alkalinity of water |
| Hardness | mg/L | Calcium and magnesium concentration |
| Solids | ppm | Total dissolved solids |
| Chloramines | ppm | Disinfectant levels |
| Sulfate | mg/L | Naturally occurring substance |
| Conductivity | μS/cm | Ionic activity measure |
| Organic Carbon | ppm | Organic compound presence |
| Trihalomethanes | μg/L | By-products of chlorination |
| Turbidity | NTU | Clarity of water |

---

## 🌐 Deployment

When deploying to platforms like **Render**, **Railway**, or **Vercel**, set the environment variables in the platform's dashboard instead of using `.env` files.

- **Backend**: Set `MONGO_URI`, `MONGO_DB_NAME`, `PORT`
- **Frontend**: Set all `VITE_*` variables, and update `VITE_API_URL` to your deployed backend URL

> ⚠️ Never commit your `.env` files. They are already listed in `.gitignore`.

---

## 🎯 Use Case

Designed to assist in rapid water quality assessments where lab testing isn't immediately available — useful for field researchers, NGOs, and community health workers monitoring drinking water safety.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
