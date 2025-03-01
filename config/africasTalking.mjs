import AfricasTalking from "africastalking";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Africa's Talking
const africasTalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

const sendSMS = async (deviceId, temp) => {
  try {
    const message = `⚠️ High Temprature Alert! Your device (${deviceId}) is ${temp}°C Please check your device.`;

    console.log("📩 Sending SMS to:", process.env.ALERT_PHONE);

    const result = await africasTalking.SMS.send({
      to: process.env.ALERT_PHONE, // Admin's phone number from .env
      message,
      from: process.env.AT_SENDER_ID || "", // Optional sender ID
    });

    console.log("✅ SMS Sent Successfully:", result);
  } catch (error) {
    console.error("❌ Error Sending SMS:", error);
  }
};

// ✅ Export function correctly for ES Modules
export default sendSMS;