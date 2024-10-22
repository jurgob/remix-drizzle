import { migrate } from "drizzle-orm/pglite/migrator"
import { db } from "./db"
export const migrateTodoSchema = async () => {
  return await migrate(db, {
    migrationsFolder:"drizzle",
  });
}