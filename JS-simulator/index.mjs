import axios from "axios";

const DEVICE_ID = "meter-123";
const SERVER_URL = "http://localhost:6000/energy";

setInterval(async () => {
  const temp = Math.floor(Math.random() * 50); 

  console.log(`Sending data: ${temp}W`);
  try {
    await axios.post(SERVER_URL, { deviceId: DEVICE_ID, temp });
  } catch (error) {
    console.error("Error sending data:", error.message);
  }
}, 5000); // Sends data every 5 seconds