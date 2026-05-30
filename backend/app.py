from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

# ==========================
# LOAD MODEL & SCALER
# ==========================

model = joblib.load("placement_predictor_model.pkl")
scaler = joblib.load("scaler.pkl")

print("Model Loaded Successfully")
print("Scaler expects:", scaler.n_features_in_, "features")

# ==========================
# HOME ROUTE
# ==========================

@app.route('/')
def home():
    return jsonify({
        "message": "Placement Predictor API Running"
    })

# ==========================
# PREDICT ROUTE
# ==========================

@app.route('/predict', methods=['POST'])
def predict():

    try:
        data = request.json

        features = np.array([[
            float(data['ssc_p']),
            float(data['hsc_p']),
            float(data['degree_p']),
            int(data['workex']),
            float(data['etest_p']),
            int(data['specialisation']),
            float(data['mba_p'])
        ]])

        print("Received Features:", features)

        # Scale Data
        scaled_data = scaler.transform(features)

        # Predict
        prediction = model.predict(scaled_data)

        result = "Placed" if prediction[0] == 1 else "Not Placed"

        return jsonify({
            "prediction": result
        })

    except Exception as e:
        print("ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500

# ==========================
# RUN APP
# ==========================

if __name__ == '__main__':
    app.run(debug=True)

