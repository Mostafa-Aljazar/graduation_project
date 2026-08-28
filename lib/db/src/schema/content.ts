import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./auth";

export const contentTypeEnum = pgEnum("content_type", ["ADS", "BLOG", "SUCCESS_STORIES"]);
export const contentStatusEnum = pgEnum("content_status", ["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const contentPostsTable = pgTable(
  "content_posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 240 }).notNull(),
    summary: text("summary"),
    body: text("body").notNull(),
    type: contentTypeEnum("type").notNull(),
    status: contentStatusEnum("status").notNull().default("DRAFT"),
    authorUserId: integer("author_user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "restrict" }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("content_posts_type_status_idx").on(table.type, table.status),
    index("content_posts_published_idx").on(table.publishedAt),
  ],
);

export const mediaReferencesTable = pgTable(
  "media_references",
  {
    id: serial("id").primaryKey(),
    ownerType: varchar("owner_type", { length: 80 }).notNull(),
    ownerId: integer("owner_id").notNull(),
    objectPath: text("object_path").notNull(),
    publicUrl: text("public_url"),
    mimeType: varchar("mime_type", { length: 120 }),
    altText: varchar("alt_text", { length: 240 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("media_owner_idx").on(table.ownerType, table.ownerId)],
);

export const contactRequestsTable = pgTable(
  "contact_requests",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 40 }),
    message: text("message").notNull(),
    status: varchar("status", { length: 40 }).notNull().default("NEW"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("contact_status_idx").on(table.status)],
);

export const insertContentPostSchema = createInsertSchema(contentPostsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertContactRequestSchema = createInsertSchema(contactRequestsTable).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type ContentPostRecord = typeof contentPostsTable.$inferSelect;
export type ContactRequestRecord = typeof contactRequestsTable.$inferSelect;
export type InsertContentPost = z.infer<typeof insertContentPostSchema>;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;