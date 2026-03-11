import { z } from "zod";
import { insertApplicationSchema, applications } from "./schema";

export const api = {
  uploads: {
    create: {
      method: "POST" as const,
      path: "/api/uploads" as const,
      responses: {
        201: z.object({
          url: z.string(),
          filename: z.string(),
          mimetype: z.string(),
          size: z.number(),
        }),
      },
    },
  },
  applications: {
    create: {
      method: "POST" as const,
      path: "/api/applications" as const,
      input: insertApplicationSchema,
      responses: {
        201: z.custom<typeof applications.$inferSelect>(),
      },
    },
  },
};

export type ApplicationInput = z.infer<typeof api.applications.create.input>;
export type ApplicationResponse = z.infer<typeof api.applications.create.responses[201]>;
