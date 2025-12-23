import type { Express } from "express";
import { type Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // All product and auth operations are now handled directly by Supabase
  // The client connects to Supabase directly using the anon key
  // No server-side API routes needed for basic CRUD operations
  
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return httpServer;
}
