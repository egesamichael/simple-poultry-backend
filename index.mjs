import express from "express";
import dotenv from "dotenv";
import cors from "cors";          // ✅ Include CORS if you want cross-domain access
import sendSMS from "./config/africasTalking.mjs";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Allows cross-domain requests, including from Wokwi browser console

// Optional: a quick health check route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Main POST route
app.post("/energy", async (req, res) => {
  const { deviceId, temp } = req.body;

  try {
    console.log(`📡 Received Data: Device (${deviceId}) - ${temp}°C`);

    // Validate the required fields
    if (!deviceId || typeof temp === "undefined") {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // Example logic: If temperature > 25, send an SMS alert
    if (temp > 25) {
      console.log(`⚠️ High Temperature Detected (${temp}°C). Sending SMS...`);
      await sendSMS(deviceId, temp);
    }

    // Return JSON response
    res.json({ success: true, message: "Data received and processed" });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
