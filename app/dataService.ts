import {db} from "./db/db";
import {migrateTodoSchema} from "./db/migrate";
import { todoTable} from "./db/schema";


export async function createDataService() {
    
    await migrateTodoSchema();
    
    const createTodo = async (todo: typeof todoTable.$inferInsert) => {
        return await db.insert(todoTable).values(todo);   
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