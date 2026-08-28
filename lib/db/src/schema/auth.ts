import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userRoleEnum = pgEnum("user_role", [
  "MANAGER",
  "DELEGATE",
  "DISPLACED",
  "SECURITY",
]);

export const userRankEnum = pgEnum("user_rank", [
  "MANAGER",
  "DELEGATE",
  "DISPLACED",
  "SECURITY",
  "SECURITY_OFFICER",
]);

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").notNull(),
    rank: userRankEnum("rank").notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    identity: varchar("identity", { length: 64 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 40 }),
    alternativePhone: varchar("alternative_phone", { length: 40 }),
    profileImage: text("profile_image"),
    gender: varchar("gender", { length: 32 }),
    nationality: varchar("nationality", { length: 80 }),
    socialStatus: varchar("social_status", { length: 80 }),
    education: varchar("education", { length: 120 }),
    age: integer("age"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("users_email_unique").on(table.email),
    uniqueIndex("users_identity_unique").on(table.identity),
    index("users_role_idx").on(table.role),
  ],
);

export const sessionsTable = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("sessions_token_hash_unique").on(table.tokenHash),
    index("sessions_user_idx").on(table.userId),
    index("sessions_expires_idx").on(table.expiresAt),
  ],
);

export const insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertSessionSchema = createInsertSchema(sessionsTable).omit({
  id: true,
  createdAt: true,
});

export type UserRecord = typeof usersTable.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SessionRecord = typeof sessionsTable.$inferSelect;