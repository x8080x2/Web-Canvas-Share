import "dotenv/config";
import { sendApplicationNotification } from "./telegram.js";

async function testTelegramNotification() {
  console.log("🚀 Starting Telegram Notification Test...");
  console.log("BOT_TOKEN:", process.env.TELEGRAM_BOT_TOKEN ? "✅ Present" : "❌ Missing");
  console.log("CHAT_ID:", process.env.TELEGRAM_CHAT_ID ? "✅ Present" : "❌ Missing");

  const mockApplication = {
    id: 1,
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "1234567890",
    vehicleType: "Car",
    ageConfirmed: true,
    idFront: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", // 1x1 red pixel
    idBack: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    status: "pending",
    createdAt: new Date(),
  };

  try {
    await sendApplicationNotification(mockApplication as any);
    console.log("✅ Test completed. Check your Telegram chat!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testTelegramNotification();
