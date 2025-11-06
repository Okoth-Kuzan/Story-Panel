import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  panelsData: jsonb("panels_data").$type<Panel[]>().default([]).notNull(),
});

// Type definitions for panel data structure
export interface CharacterInstance {
  id: string;
  templateId: string;
  name: string;
  image: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export interface DialogueBubble {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'speech' | 'thought' | 'shout';
  targetCharacterId?: string;
}

export interface Panel {
  id: string;
  backgroundImage?: string;
  characters: CharacterInstance[];
  dialogues: DialogueBubble[];
}

// Character templates for the library
export interface CharacterTemplate {
  id: string;
  name: string;
  image: string;
  category: string;
}

// Background templates
export interface BackgroundTemplate {
  id: string;
  name: string;
  image: string;
  category: string;
}

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  name: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  thumbnail: true,
  panelsData: true,
}).extend({
  panelsData: z.array(z.any()).optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().optional(),
  thumbnail: z.string().optional(),
  panelsData: z.array(z.any()).optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type Project = typeof projects.$inferSelect;