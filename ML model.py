# pcos_model_training_debugged.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Step 1: Load dataset
try:
    df = pd.read_csv("PCOS_data.csv")  # Make sure this file is in the same directory
    print("✅ Dataset loaded successfully.")
except FileNotFoundError:
    print("❌ Error: 'PCOS_data.csv' not found. Please check the file path.")
    exit()

# Step 2: Drop irrelevant columns if they exist
df.drop(columns=['Sl. No', 'Patient File No.'], inplace=True, errors='ignore')

# Step 3: Clean data - drop rows with missing values
df.dropna(inplace=True)
print(f"📊 Remaining data rows after dropping NA: {len(df)}")

# Step 4: Encode binary (Y/N) columns if present
binary_columns = ['Hair growth(Y/N)', 'Skin darkening (Y/N)', 'Fast food (Y/N)',
                  'Pimples(Y/N)', 'Weight gain(Y/N)', 'Cycle(R/I)', 'Exercise(Y/N)']

label_enc = LabelEncoder()
for col in binary_columns:
    if col in df.columns:
        df[col] = label_enc.fit_transform(df[col])
        print(f"🔁 Encoded column: {col}")
    else:
        print(f"⚠️ Column missing (skipped): {col}")

# Step 5: Select features and label
# Check for missing features
features =
