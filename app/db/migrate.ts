import { migrate } from "drizzle-orm/pglite/migrator"
import { db } from "./db"


export const migrateTodoSchema = async () => await migrate(db, {
  migrationsFolder:"drizzle",
});