import express from "express";
import dotenv from "dotenv";
import sendSMS from "./config/africasTalking.mjs"; // Ensure correct import

dotenv.config();

const app = express();
app.use(express.json());

// // ✅ Add CORS Middleware (if needed)
// import cors from "cors";
// app.use(cors());

app.post("/energy", async (req, res) => {
  const { deviceId, temp } = req.body;

  try {
    console.log(`📡 Received Data: Device (${deviceId}) - ${temp}°C`);

    // ✅ Validate input
    if (!deviceId || !temp) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // ✅ Send SMS alert if usage exceeds 500W
    if (temp > 25) {
      console.log(`⚠️ High Temprature Detected (${temp}°C)`);
      await sendSMS(deviceId, temp);
    }

    res.json({ success: true, message: "Data received and processed" });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));