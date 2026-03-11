import { db } from "./db";
import { applications, type InsertApplication, type Application } from "@shared/schema";

export interface IStorage {
  createApplication(application: InsertApplication): Promise<Application>;
}

export class DatabaseStorage implements IStorage {
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    if (!db) {
      throw new Error("Database not connected");
    }
    const [application] = await db.insert(applications).values(insertApplication).returning();
    return application;
  }
}

export class MemStorage implements IStorage {
  private applications: Map<number, Application>;
  private currentId: number;

  constructor() {
    this.applications = new Map();
    this.currentId = 1;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentId++;
    const application: Application = {
      ...insertApplication,
      id,
      status: "pending",
      createdAt: new Date(),
      ageConfirmed: insertApplication.ageConfirmed ?? false,
      idFront: insertApplication.idFront ?? null,
      idBack: insertApplication.idBack ?? null,
    };
    this.applications.set(id, application);
    return application;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
