import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").default(false),
});