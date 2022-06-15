import { Pool, PoolClient, QueryResult } from 'pg';

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

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})

async function query(text: string, params: (string | number)[], callback: (err: Error, res: QueryResult) => void) {
    return pool.query(text, params, (err: Error, res) => {
        callback(err, res);
    });
};

async function getClient(callback: (err: Error, client: PoolClient, done: (release?: any) => void) => void) {
    pool.connect((err, client, done) => {
        callback(err, client, done);
    })
}

export {
    query,
    getClient
};
