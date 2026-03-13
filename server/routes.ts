import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendApplicationNotification } from "./telegram";
import multer from "multer";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { getUploadsDir } from "./uploads";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const uploadsDir = getUploadsDir();
  fs.mkdirSync(uploadsDir, { recursive: true });

  const upload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, uploadsDir),
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname || "").slice(0, 10);
        cb(null, `${nanoid()}${ext || ""}`);
      },
    }),
    limits: {
      fileSize: 15 * 1024 * 1024,
    },
  });

  app.post(api.uploads.create.path, upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    return res.status(201).json({
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  });

  app.post(api.applications.create.path, async (req, res) => {
    try {
      const input = api.applications.create.input.parse(req.body);
      const application = await storage.createApplication(input);

      sendApplicationNotification(application).catch((err) => {
        console.error("Failed to send Telegram notification:", err);
      });

      res.status(201).json(application);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
