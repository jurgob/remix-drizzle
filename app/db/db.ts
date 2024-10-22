import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePgLite } from 'drizzle-orm/pglite';
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
const {Pool} = pkg;
// connectionString
import {env} from "../env";

function createDb() {
    if(env.DATABASE_URL === ":inmemory:") {
        const client = new PGlite();
        const db = drizzlePgLite(client);
        return db;
    }else {
        const pool = new Pool({
            connectionString: env.DATABASE_URL
        });
        const db = drizzle(pool);
        return db;
    }
    
}


export const db = createDb();

