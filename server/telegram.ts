import { type Application } from "@shared/schema";
import fs from "fs";
import path from "path";
import { getUploadsDir } from "./uploads";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendApplicationNotification(application: Application) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram bot token or chat ID is missing. Notification not sent.");
    return;
  }

  const message = `
🚀 *New Driver Application*

👤 *Name:* ${application.firstName} ${application.lastName}
📧 *Email:* ${application.email}
📱 *Phone:* ${application.phone}
🚗 *Vehicle:* ${application.vehicleType}
✅ *Age Confirmed:* ${application.ageConfirmed ? "Yes" : "No"}
🕒 *Applied at:* ${application.createdAt ? new Date(application.createdAt).toLocaleString() : "N/A"}

🪪 *ID Front:* ${application.idFront ? "Attached" : "Not provided"}
🪪 *ID Back:* ${application.idBack ? "Attached" : "Not provided"}
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    console.log(`Sending Telegram notification to ${CHAT_ID}...`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Telegram API error (sendMessage): ${response.status} ${errorText}`);
    } else {
      console.log("✅ Main notification message sent.");
    }

    if (application.idFront) {
      console.log("Sending ID Front photo...");
      await sendPhoto(application.idFront, "ID Front");
    }
    if (application.idBack) {
      console.log("Sending ID Back photo...");
      await sendPhoto(application.idBack, "ID Back");
    }
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
  }
}

async function sendPhoto(photoRef: string, caption: string) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  try {
    const { buffer, mimetype, filename } = await resolvePhoto(photoRef);

    const formData = new FormData();
    formData.append("chat_id", CHAT_ID!);
    formData.append("caption", caption);

    const blob = new Blob([new Uint8Array(buffer)], { type: mimetype });
    formData.append("photo", blob, filename);

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Telegram API error (sendPhoto - ${caption}): ${response.status} ${errorText}`);
    } else {
      console.log(`✅ ${caption} sent.`);
    }
  } catch (err) {
    console.error(`Failed to send ${caption}:`, err);
  }
}

async function resolvePhoto(photoRef: string): Promise<{
  buffer: Buffer;
  mimetype: string;
  filename: string;
}> {
  if (photoRef.startsWith("data:")) {
    const header = photoRef.slice(0, photoRef.indexOf(","));
    const base64Content = photoRef.split(",")[1] || "";
    const buffer = Buffer.from(base64Content, "base64");
    const mimetype = header.match(/^data:([^;]+)/)?.[1] || "image/jpeg";
    const ext = mimetypeToExt(mimetype);
    return { buffer, mimetype, filename: `id${ext}` };
  }

  if (photoRef.startsWith("http://") || photoRef.startsWith("https://")) {
    const res = await fetch(photoRef);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimetype = res.headers.get("content-type") || "application/octet-stream";
    const ext = mimetypeToExt(mimetype);
    return { buffer, mimetype, filename: `id${ext}` };
  }

  if (photoRef.startsWith("/uploads/")) {
    const uploadsDir = getUploadsDir();
    const safeFilename = path.basename(photoRef);
    const filePath = path.join(uploadsDir, safeFilename);
    const buffer = await fs.promises.readFile(filePath);
    const mimetype = extToMimetype(path.extname(safeFilename));
    return { buffer, mimetype, filename: safeFilename };
  }

  const safeFilename = path.basename(photoRef);
  const buffer = await fs.promises.readFile(photoRef);
  const mimetype = extToMimetype(path.extname(safeFilename));
  return { buffer, mimetype, filename: safeFilename };
}

function mimetypeToExt(mimetype: string) {
  if (mimetype === "image/png") return ".png";
  if (mimetype === "image/webp") return ".webp";
  if (mimetype === "image/heic") return ".heic";
  return ".jpg";
}

function extToMimetype(ext: string) {
  const normalized = ext.toLowerCase();
  if (normalized === ".png") return "image/png";
  if (normalized === ".webp") return "image/webp";
  if (normalized === ".heic") return "image/heic";
  return "image/jpeg";
}
