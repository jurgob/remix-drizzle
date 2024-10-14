import {boolean, integer, varchar,timestamp,pgSchema} from "drizzle-orm/pg-core";

const todoSchema = pgSchema("todo_schema");



export const todoTable = todoSchema.table("todo", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    text: varchar({ length: 255 }).notNull(),
    completed: boolean().default(false),
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
});

export { todoSchema };