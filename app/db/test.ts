import {db} from "./db";
import {migrateTodoSchema} from "./migrate";
import { todoTable} from "./schema";

const main = async () => {
    await migrateTodoSchema();
    const user: typeof todoTable.$inferInsert = {
        text: 'Learn how to use Drizzle ORM',
    };
    await db.insert(todoTable).values(user);
    console.log('New todo created!')
    const users = await db.select().from(todoTable);
    console.log('Getting all todos from the database: ', users)
};

main()