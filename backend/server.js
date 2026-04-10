require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint for Render
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));


const uri = process.env.MONGO_URI;
let client = null;

if (!uri) {
  console.error("⚠️  WARNING: MONGO_URI environment variable is not set. Database features will be unavailable.");
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function connectDB() {
    try {
      await client.connect();
      console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
  connectDB();
}

app.post('/api/predict', async (req, res) => {
  try {
    const { userId, features } = req.body;

    // Validate inputs
    if (!userId || !features) {
      return res.status(400).json({ error: "Missing userId or features string" });
    }

    // Call predict.py script
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const pythonProcess = spawn(pythonCmd, ['predict.py']);

    pythonProcess.on('error', (err) => {
      console.error("Failed to start python process:", err);
      if (!res.headersSent) {
        return res.status(500).json({ error: "Prediction service unavailable." });
      }
    });

    let modelOutput = '';
    let modelError = '';

    pythonProcess.stdout.on('data', (data) => {
      modelOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      modelError += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        console.error(modelError);
        return res.status(500).json({ error: "Prediction process failed" });
      }

      try {
        const result = JSON.parse(modelOutput);

        if (!result.success) {
          return res.status(500).json({ error: result.error || "Prediction failed" });
        }

        // Save result to MongoDB
        if (!client) {
          return res.json({ success: true, drinkable: result.drinkable, message: "Prediction successful (DB not configured, result not saved)." });
        }
        try {
          const db = client.db(process.env.MONGO_DB_NAME);
          const collection = db.collection('predictions');

          const document = {
            userId,
            features,
            drinkable: result.drinkable,
            timestamp: new Date()
          };

          await collection.insertOne(document);
          return res.json({ success: true, drinkable: result.drinkable, savedId: document._id, message: "Prediction successful and saved" });
        } catch (dbError) {
          console.error("MongoDB Insert Error:", dbError);
          return res.json({ success: true, drinkable: result.drinkable, message: "Prediction successful, but failed to save to database." });
        }

      } catch (parseError) {
        console.error("Error parsing python output:", modelOutput);
        return res.status(500).json({ error: "Error parsing prediction result" });
      }
    });

    // Send the features to the python script
    pythonProcess.stdin.write(JSON.stringify(features));
    pythonProcess.stdin.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    if (!client) {
      return res.status(503).json({ error: "Database not configured. Please set MONGO_URI." });
    }
    const db = client.db(process.env.MONGO_DB_NAME);
    const collection = db.collection('predictions');

    // Sort by timestamp descending (newest first)
    const history = await collection.find({ userId }).sort({ timestamp: -1 }).toArray();

    res.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
