import path from 'path';
import { Pool } from 'pg';
import { migrate } from 'postgres-migrations';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_POOL_SIZE } = process.env;

let parsedPort = Number(POSTGRES_PORT!);

const pool = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: 'watykan',
    host: 'localhost',
    port: parsedPort,
    max: Number(POSTGRES_POOL_SIZE),
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 3000,
});

const db = {
    runMigrations: async function (): Promise<void> {
        const client = await pool.connect();
        try {
            await migrate({ client }, path.resolve(__dirname, 'migrations/sql'));
        } catch (err) {
            console.log('migration failed', err);
        } finally {
            client.release()
        }
    },
}

export default db;
