import { Pool, PoolClient, QueryResult } from 'pg';
import { provideStringEnvVar } from '../util/envProvider';

const pool = new Pool({
    user: provideStringEnvVar('POSTGRES_USER'),
    password: provideStringEnvVar('POSTGRES_PASSWORD'),
    database: provideStringEnvVar('POSTGRES_DB'),
    host: provideStringEnvVar('POSTGRES_HOST'),
    port: Number(provideStringEnvVar('POSTGRES_PORT')),
    max: Number(provideStringEnvVar('POSTGRES_POOL_SIZE')),
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 3000,
});

pool.on('error', (err, client) => {
    return err;
})

/**
 * @desc - Executes a query using the underlying pool of client connections
 * @param text - SQL query
 * @param params - parameters to be inserted into the query
 * @param callback - callback function to be called after query is executed
 * @returns - A promise that resolves to the result of the query
 */
async function query(text: string, params: (string | number)[], callback: (err: Error, res: QueryResult) => void) {
    return pool
        .on('error',(err, client) => {
            return err;
        })
        .query(text, params, (err, res) => {
            callback(err, res);
        })
};

/**
 * @desc - Returns the underlying pool Client
 * @param callback - callback function to be called after query is executed
 */
async function getClient(callback: (err: Error, client: PoolClient, done: (release?: any) => void) => void) {
    return pool.connect((err, client, done) => {
        callback(err, client, done);
    })
}

export {
    query,
    getClient,
    pool
};
