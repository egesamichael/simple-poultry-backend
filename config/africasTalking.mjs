import AfricasTalking from "africastalking";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Africa's Talking
const africasTalking = AfricasTalking({
  //Our API Details
  apiKey: atsk_3d814782a1460f7bb6f91a1b3e0365d2307f40fc1e086181c3d2c2886f8e423720499839,
  username: sandbox,
});

const sendSMS = async (deviceId, temp) => {
  try {
    const message = `⚠️ High Temprature Alert! Your device (${deviceId}) is ${temp}°C Please check your device.`;

    console.log("📩 Sending SMS to:", '+256787283855');

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