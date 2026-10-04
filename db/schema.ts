import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const rsvps = sqliteTable("rsvps", {
  id: text("id").primaryKey(),
  contactKey: text("contact_key").notNull().unique(),
  fullName: text("full_name").notNull(),
  contact: text("contact").notNull(),
  attending: integer("attending").notNull(),
  total: integer("total").notNull(),
  companions: text("companions").notNull().default(""),
  children: text("children").notNull().default(""),
  dietary: text("dietary").notNull().default(""),
  rides: text("rides").notNull().default(""),
  message: text("message").notNull().default(""),
  comments: text("comments").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
