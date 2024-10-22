import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePgLite } from 'drizzle-orm/pglite';
import { migrate as pbLiteMitrate } from "drizzle-orm/pglite/migrator"


import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
const {Pool} = pkg;
import { migrate  as pgNodMigrate} from "drizzle-orm/node-postgres/migrator"

const MIGRATE_CONFIG =  {
    migrationsFolder: "drizzle"
}

// connectionString
import {env} from "../env";

function createDb() {
    if(env.DATABASE_URL === ":inmemory:") {
        const client = new PGlite();
        const db = drizzlePgLite(client);
        const migrate = async () => {
            return await pbLiteMitrate(db,MIGRATE_CONFIG);
        }
        return {
            db,
            migrate
        };
    }else {
        const pool = new Pool({
            connectionString: env.DATABASE_URL
        });
        const db = drizzle(pool);
        const migrate = async () => {
            return await pgNodMigrate(db,MIGRATE_CONFIG);
        }
        return { 
            db,
            migrate
        };
    }
    
}


export const dbClient = createDb();

