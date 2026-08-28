import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./auth";

export const displacedPersonsTable = pgTable(
  "displaced_persons",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    delegateUserId: integer("delegate_user_id").references(() => usersTable.id, {
      onDelete: "set null",
    }),
    familyNumber: integer("family_number").notNull().default(1),
    tentName: varchar("tent_name", { length: 120 }),
    previousResidence: varchar("previous_residence", { length: 200 }),
    healthNotes: text("health_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("displaced_user_unique").on(table.userId),
    index("displaced_delegate_idx").on(table.delegateUserId),
    index("displaced_tent_idx").on(table.tentName),
  ],
);

export const insertDisplacedPersonSchema = createInsertSchema(displacedPersonsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type DisplacedPersonRecord = typeof displacedPersonsTable.$inferSelect;
export type InsertDisplacedPerson = z.infer<typeof insertDisplacedPersonSchema>;