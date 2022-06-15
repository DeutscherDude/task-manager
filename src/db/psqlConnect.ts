import { Pool, PoolClient, QueryResult } from 'pg';
import { provideStringEnvVar } from '../util/envProvider';

const pool = new Pool({
    user: provideStringEnvVar('POSTGRES_USER'),
    password: provideStringEnvVar('POSTGRES_PASSWORD'),
    database: provideStringEnvVar('POSTGRES_DB'),
    host: 'db',
    port: Number(provideStringEnvVar('POSTGRES_PORT')),
    max: Number(provideStringEnvVar('POSTGRES_POOL_SIZE')),
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 3000,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
})

async function query(text: string, params: (string | number)[], callback: (err: Error, res: QueryResult) => void) {
    return pool
        .connect()
        .then(client => {
            client.query(text, params, (err, res) => {
                client.release();
                callback(err, res);
            })
        })
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
