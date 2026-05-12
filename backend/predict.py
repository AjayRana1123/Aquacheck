import sys
import json
import os
import pickle
import numpy as np
import warnings

# Ignore warnings from scikit-learn
warnings.filterwarnings("ignore")

# Resolve paths relative to this script's location (works on any server)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def main():
    try:
        # Read parameters from stdin
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        
        # Paths to ML models (relative to this script — works on any server)
        model_path = os.path.join(BASE_DIR, 'models', 'water_potability_xgb_model.pkl')
        scaler_path = os.path.join(BASE_DIR, 'models', 'scaler (1).pkl')
        features_path = os.path.join(BASE_DIR, 'models', 'features (1).pkl')
        
        import joblib
        
        # Load the models and feature names
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        feature_names = joblib.load(features_path)
        
        # Build features array dynamically based on features list
        features = [data.get(f, 0) for f in feature_names]
            
        # Transform features
        features_array = np.array(features).reshape(1, -1)
        scaled_features = scaler.transform(features_array)
        
        # Predict
        prediction = model.predict(scaled_features)
        
        # Return result
        result = int(prediction[0])
        print(json.dumps({"success": True, "drinkable": result == 1}))
        
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

if __name__ == "__main__":
    main()
