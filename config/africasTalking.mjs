import AfricasTalking from "africastalking";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * 1) Create a separate AT instance for SMS
 *    (This uses a "sandbox" example, but replace with your real credentials if needed.)
 */
const smsAfricasTalking = AfricasTalking({
  apiKey: "atsk_9c34b833c55e205a3a4fd67fc67664cedea8e17cdd4cc9cb18b0591de0dc1fe4ecaa1631",
  username: "egesasimplepoultry"
});

const smsService = smsAfricasTalking.SMS;

/**
 * 2) Voice handled via direct POST to AT's Voice endpoint 
 *    so we can specify `callActions` that read out the message.
 *    We do not create a second AfricasTalking(...) instance for voice;
 *    we just do an Axios call with a different voice API key.
 */

/**
 * Default-exported function that sends an SMS and then initiates a voice call
 * which will read the text message (TTS).
 */
async function sendSMSAndCall(deviceId, temp) {
  try {
    // The phone number to send the SMS to and call
    const phoneNumber = "+256787283855"; 

    // Build your message text
    const message = `Temperature change in Brooder. Your device (${deviceId}) is ${temp}°C. Please check immediately.`;

    console.log("📩 Sending SMS to:", phoneNumber);
    // --- 1) SEND SMS ---
    const smsResult = await smsService.send({
      to: phoneNumber,
      message,
      from: ""// If you have a sender ID, set it here
    });
    console.log("✅ SMS Sent Successfully:", smsResult);

    // --- 2) MAKE A VOICE CALL THAT READS THE MESSAGE ---
    console.log("📞 Making voice call to:", phoneNumber);

    // The POST body for the Africa's Talking Voice API
    const voicePayload = {
      callActions: [
        {
          actionType: "Say",
          text: message // The TTS text the call will "speak"
        }
      ],
      from: "+256323200892", // Must be a verified caller ID in your AT account
      to: [ phoneNumber ],
      username: 'egesasimplepoultry' // e.g. "sandbox" or real username
    };

    // The headers, including a separate Voice API key
    const voiceHeaders = {
      Accept: "application/json",
      apiKey: "atsk_9c34b833c55e205a3a4fd67fc67664cedea8e17cdd4cc9cb18b0591de0dc1fe4ecaa1631",
      "Content-Type": "application/json"
    };

    // Make the POST request
    const voiceResponse = await axios.post(
      "https://voice.africastalking.com/call",
      voicePayload,
      { headers: voiceHeaders }
    );

    console.log("✅ Voice Call Placed:", voiceResponse.data);
  } catch (error) {
    console.error("❌ Error Sending SMS or Making Call:", error);
  }
}

// ✅ DEFAULT EXPORT: Now you can import it as `import sendSMSAndCall from "./africasTalking.mjs";`
export default sendSMSAndCall;
