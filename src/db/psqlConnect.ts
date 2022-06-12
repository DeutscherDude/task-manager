import { Pool } from 'pg';

const { POSTGRES_USER, POSTGRES_PASSWORD, SERVER_PORT } = process.env;

let parsedPort = parseInt(SERVER_PORT, 10);

const pool = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: 'postgres',
    host: 'localhost',
    port: parsedPort
});


// export const connect = async () => {
//     await client.connect();
//     console.log('Connected to Postgres');
// }

