import {dbClient} from "./db/db";
import { todoTable} from "./db/schema";
import {env} from "./env";

export async function createDataService() {
    const {db, migrate} = dbClient;
    console.log("creating data service");
    console.log(`env.DATABASE_URL `, env.DATABASE_URL);
    await migrate();
    
    const createTodo = async (todo: typeof todoTable.$inferInsert) => {
        return (await db.insert(todoTable).values(todo).returning().execute())[0];   
    }
    const getTodos = async ({page =1, pageSize=10}) => {
        const offset = (page - 1) * pageSize;
        const todos = await db.select().from(todoTable).limit(pageSize).offset(offset);
        return todos;
    }

    return {
        createTodo,
        getTodos
    }

}