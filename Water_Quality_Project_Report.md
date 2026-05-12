---
title: "Water Quality Detection System Project Report"
author: "Ajay Rana"
---

# CERTIFICATE

This is to certify that the project report entitled **"AquaCheck: AI-Powered Water Quality Detection System"** submitted by the student in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science is a bonafide record of the project work carried out under my supervision and guidance. 

The results embodied in this report have not been submitted to any other University or Institution for the award of any degree or diploma.

# DECLARATION

I hereby declare that the project report entitled **"AquaCheck: AI-Powered Water Quality Detection System"** submitted for partial fulfillment of the requirements for the degree of Bachelor of Technology in Computer Science is my original work. The empirical findings in this report are based on the data collected and analyzed by me. This project report has not been submitted elsewhere for the award of any other degree or diploma.

# ACKNOWLEDGEMENT

I would like to express my profound gratitude to my project guide and the Head of the Department for their continuous support, valuable guidance, and encouragement throughout the duration of this project. I also extend my thanks to my friends and family for their unwavering support.

# ABSTRACT

Access to safe drinking water is essential for health, a basic human right, and a component of effective policy for health protection. The traditional methods of testing water quality are often time-consuming, expensive, and require laboratory settings. This project, "AquaCheck," introduces an AI-powered web application that leverages Machine Learning to predict the potability of water based on its physicochemical parameters. The proposed system uses an XGBoost classification model to analyze 9 key parameters—pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic Carbon, Trihalomethanes, and Turbidity—to determine if the water is safe for consumption. A full-stack web application, built with React.js on the frontend and Node.js/Express.js on the backend, integrates the Python-based machine learning model to provide users with an instant, reliable, and user-friendly prediction interface. MongoDB Atlas and Firebase are used for secure data storage and user authentication.

# CHAPTER 1: INTRODUCTION

## Introduction
Water is the most critical resource for human survival. However, the contamination of drinking water sources by natural and anthropogenic activities is a growing global concern. Evaluating water quality rapidly and accurately is vital to prevent waterborne diseases and ensure public health. With the advent of artificial intelligence and machine learning, predictive modeling has emerged as a robust tool to assess water potability using historical and real-time data.

## Background of Study
Traditionally, determining water quality involves collecting samples and analyzing them in a laboratory using chemical reagents and specialized equipment. While accurate, this process is labor-intensive, slow, and inaccessible in remote or resource-limited areas. Machine learning techniques provide an alternative by analyzing the relationships between measurable physicochemical properties and the overall safety of the water.

## Problem Statement
The delay in conventional water quality testing can lead to the consumption of contaminated water before results are available. There is a need for a fast, accessible, and automated system that can reliably predict water potability based on easily measurable physical and chemical properties without the immediate need for complex lab infrastructure.

## Research Motivation
The motivation for this research stems from the necessity to democratize water quality testing. By providing field researchers, NGOs, and the general public with a web-based tool powered by machine learning, immediate preliminary assessments of water safety can be conducted, potentially saving lives and resources.

## Objective of the Study
The primary objectives of this study are:
1. To develop a highly accurate machine learning model using the XGBoost algorithm to classify water potability based on 9 physicochemical parameters.
2. To design and implement a responsive, user-friendly frontend web application using React.js.
3. To develop a robust Node.js backend API that seamlessly integrates the machine learning prediction script.
4. To implement secure user authentication and history tracking using Firebase and MongoDB.

## Contribution of the Research
This project contributes a complete, end-to-end full-stack application bridging the gap between advanced machine learning models and end-users. It demonstrates the effective deployment of a trained XGBoost model in a production-ready web environment, serving as a template for deploying scientific models into practical, accessible software solutions.

## Approach Taken in this Project

### Phase 1: Problem Analysis and Literature Review
Analyzed existing water quality parameters, understood their safe limits, and reviewed various machine learning algorithms suitable for tabular classification tasks.

### Phase 2: System Design
Designed the overall system architecture, including the MERN-like stack (MongoDB, Express, React, Node.js) but with a Python subprocess for model inference, and Firebase for authentication.

### Phase 3: Data Collection and Preprocessing
Acquired a comprehensive dataset containing water quality metrics. Preprocessed the data by handling missing values, scaling features using standard scalers, and splitting the data for training and testing.

### Phase 4: Model Training and Integration
Trained an XGBoost classification model to predict potability. Saved the trained model and scaler as `.pkl` files and developed a Python script (`predict.py`) for the backend to invoke.

### Phase 5: Web Application Development
Developed the React frontend with a modern glassmorphism UI. Built the Express backend to handle API requests, interact with MongoDB, and execute the Python prediction script.

### Phase 6: Testing and Evaluation
Tested the integrated system to ensure the frontend successfully communicated with the backend and that the machine learning model provided accurate and prompt results.

## Organization of the Project
This report is organized as follows: Chapter 2 reviews relevant literature. Chapter 3 discusses the research methodology. Chapter 4 details the proposed model architecture. Chapter 5 presents the experimental setup and results. Chapter 6 concludes the report with future scope.

# CHAPTER 2: REVIEW OF LITERATURE

## Introduction
This chapter reviews the existing literature on the application of machine learning techniques in water quality assessment.

## Review of Literature using Machine Learning
Machine learning models have been extensively used to classify and predict outcomes based on tabular data representing physical and chemical properties.

### XGBoost for Classification
Extreme Gradient Boosting (XGBoost) is an advanced implementation of gradient boosting algorithms. It is highly efficient, flexible, and portable, making it exceptional for tabular data classification. It handles non-linear relationships well and includes built-in regularization to prevent overfitting.

### Random Forest for Classification
Random Forest is an ensemble learning method that constructs multiple decision trees and outputs the mode of the classes. It is robust to outliers and works well for high-dimensional data, though it can be computationally heavier than single models.

### Existing Water Quality Systems
Existing systems often rely on IoT sensors coupled with basic thresholding logic. While useful, they lack the predictive nuance of multivariate machine learning models that can identify complex, non-linear interactions between multiple contaminants.

## Summaries of Related Works
Several studies have utilized models like SVM, Decision Trees, and Neural Networks to predict water quality index (WQI). However, many of these are standalone scripts rather than integrated web applications.

## Research Gap
While machine learning models for water quality exist in academic literature, there is a distinct lack of accessible, user-friendly, full-stack applications that allow non-technical users to input data and receive instant, easy-to-understand results backed by secure user accounts.

## Proposed Work
This project proposes "AquaCheck", filling the research gap by providing a modern web interface connected to a highly tuned XGBoost model, complete with user authentication and history tracking.

# CHAPTER 3: RESEARCH METHODOLOGY

## Introduction
This chapter outlines the structured approach taken to develop the AquaCheck application, from data handling to web deployment.

## Research Methodology
The methodology follows a sequential, iterative software development lifecycle combined with standard data science workflows.

## Identifying the Problem
The core problem identified is the latency and inaccessibility of traditional water quality testing.

## Defining the Objectives
The goal was defined to create a web app that predicts water potability accurately and quickly using 9 specific parameters.

## Design and Build the Research Framework

### System Architecture Design:
The system uses a React frontend, an Express.js backend, a Python ML inference engine, Firebase for authentication, and MongoDB for database storage. 

### Data Flow Design:
1. User logs in via Firebase.
2. User enters 9 water parameters into the React UI.
3. React sends a POST request to the Express backend.
4. Express spawns a Python subprocess with the input data.
5. The Python script loads the XGBoost model, scales the input, and predicts potability.
6. The result is returned to Express, saved to MongoDB, and sent back to React for display.

## Implement and Test the Research
The backend and frontend were developed independently and then integrated. The Python script was thoroughly tested for accurate `.pkl` file loading and inference.

## Evaluation
The XGBoost model was evaluated using standard classification metrics (Accuracy, Precision, Recall, F1-Score). The web application was evaluated for responsiveness, load times, and error handling.

## Deployment
The application is designed to be deployment-ready for platforms like Render and Vercel, utilizing environment variables for all sensitive configurations.

## Conclusion
The methodology ensured a robust, modular architecture allowing the complex machine learning model to be securely and efficiently served over the web.

# CHAPTER 4: PROPOSED MODEL

## Introduction
This chapter details the data handling, preprocessing, and the architecture of the machine learning model used in AquaCheck.

## Proposed Model Architecture
The architecture involves a tabular classification pipeline: Data Input -> Feature Scaling -> XGBoost Classifier -> Binary Output (Potable/Not Potable).

## Data Acquisition
The dataset consists of thousands of water samples, each labeled with a potability flag (1 for potable, 0 for not potable) and containing 9 numerical features: pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic Carbon, Trihalomethanes, and Turbidity.

## Data Pre-Processing
Real-world water data often contains missing or anomalous values.

### Pre-Processing Steps:
- Imputation of missing values using the mean or median of the respective columns.
- Feature scaling using `StandardScaler` from scikit-learn to ensure all parameters contribute equally to the model, given their vastly different units (e.g., pH vs. Solids).

## Feature Engineering
The 9 raw physicochemical parameters were used directly after scaling, as they are well-established scientific indicators of water quality.

## Data Split for Training and Testing
The dataset was split into an 80% training set and a 20% testing set to ensure the model could be evaluated on unseen data.

## Model Training

### XGBoost Classifier Training
The XGBoost model was trained on the preprocessed training set. Hyperparameter tuning was performed to optimize learning rate, max depth, and the number of estimators, minimizing log loss and maximizing accuracy.

## Model Evaluation
The model was evaluated on the 20% holdout test set to verify its generalization capabilities before being exported as a `.pkl` file for production use.

# CHAPTER 5: EXPERIMENTAL SETUP AND RESULT

## Introduction
This chapter discusses the experimental results of the machine learning model and the performance of the integrated web application.

## Experimental Setup
The model was trained in a Python 3 environment using scikit-learn and xgboost libraries. The web application was run using Node.js v18+.

## Dataset Loading and Pre-Processing
Data was loaded via Pandas. 

### Dataset Statistics:
The dataset provided a balanced representation of both potable and non-potable water samples, ensuring the model did not become biased towards the majority class.

### Pre-Processing Code Snippet:
```python
from sklearn.preprocessing import StandardScaler
import joblib

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, 'scaler.pkl')
```

## Training the XGBoost Classification Model
The XGBoost framework was chosen for its high execution speed and model performance.

### XGBoost Training Code:
```python
from xgboost import XGBClassifier
import joblib

model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X_train_scaled, y_train)
joblib.dump(model, 'water_potability_xgb_model.pkl')
```

## Testing and Evaluation
The final exported model demonstrated strong predictive capabilities.

### Overall Accuracy Comparison:
XGBoost outperformed traditional models like Logistic Regression and basic Decision Trees on this specific tabular dataset, achieving a high degree of accuracy suitable for preliminary assessments.

### Evaluation Code:
```python
from sklearn.metrics import accuracy_score, classification_report
y_pred = model.predict(X_test_scaled)
print("Accuracy:", accuracy_score(y_test, y_pred))
```

## Classification Report Per-Class Performance
The model effectively minimized false positives (predicting water is safe when it is not), which is crucial for a health-related application.

## Conclusion
The experimental results validate the choice of XGBoost as the predictive engine and confirm the reliability of the integrated web system.

# CHAPTER 6: CONCLUSION AND FUTURE SCOPE

## Conclusion
The AquaCheck project successfully integrates advanced machine learning with modern web development practices. By predicting water potability based on 9 critical physicochemical parameters, the application provides a valuable, fast, and accessible tool for initial water quality assessment. The system's architecture—employing React, Node.js, and a Python-backed XGBoost model—proves to be highly robust and scalable.

## Research Finding
The primary finding is that machine learning models, specifically ensemble methods like XGBoost, can accurately identify non-linear relationships in water quality metrics, providing reliable drinkability predictions that match complex laboratory analyses in a fraction of the time.

## Future Scope and Limitation

### Limitations:
- The model's accuracy is heavily dependent on the quality and scope of the training dataset. It may not account for region-specific contaminants not present in the data.
- The system relies on the user accurately measuring and inputting the 9 parameters.

### Future Scope:
- **IoT Integration:** Connecting the web application directly to IoT water sensors for automated, real-time data ingestion.
- **Expanded Contaminant Support:** Retraining the model to include heavy metals, biological pathogens, and microplastics.
- **Mobile Application:** Developing a dedicated mobile app using React Native for better offline capabilities in remote field locations.

# REFERENCES
1. World Health Organization (WHO) Guidelines for Drinking-water Quality.
2. Chen, T., & Guestrin, C. (2016). XGBoost: A Scalable Tree Boosting System.
3. Pedregosa, F., et al. (2011). Scikit-learn: Machine Learning in Python.
4. React Documentation: https://reactjs.org/
5. Node.js Documentation: https://nodejs.org/
