import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, updateProjectSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mock user ID for development (in production, this would come from auth session)
  const MOCK_USER_ID = "mock-user-1";

  // Ensure mock user exists
  const existingUser = await storage.getUserByEmail("demo@storypanel.com");
  if (!existingUser) {
    await storage.createUser({
      email: "demo@storypanel.com",
      name: "Demo User",
    });
  }

  // Get all projects for the current user
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const userId = MOCK_USER_ID;
      let user = await storage.getUser(userId);
      
      if (!user) {
        user = await storage.createUser({
          email: "demo@storypanel.com",
          name: "Demo User",
        });
      }

      const projects = await storage.getProjectsByUserId(user.id);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get a single project
  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Create a new project
  app.post("/api/projects", async (req: Request, res: Response) => {
    try {
      const userId = MOCK_USER_ID;
      let user = await storage.getUser(userId);
      
      if (!user) {
        user = await storage.createUser({
          email: "demo@storypanel.com",
          name: "Demo User",
        });
      }

      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(user.id, validatedData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ error: "Failed to create project" });
    }
  });

  // Update a project
  app.patch("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const validatedData = updateProjectSchema.parse(req.body);
      const project = await storage.updateProject(req.params.id, validatedData);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(400).json({ error: "Failed to update project" });
    }
  });

  // Delete a project
  app.delete("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}