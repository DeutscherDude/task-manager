import { newDb, QueryResult } from 'pg-mem';
import { StatusCodes } from '../util/statusCodes';

const db = newDb();
db.public.none(`
--sql
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)
`);

db.public.none(`
--sql
CREATE TABLE IF NOT EXISTS tasks (
    task_id SERIAL PRIMARY KEY,
    fk_user_id INTEGER,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)
`)

db.public.none(`
--sql
INSERT INTO users(username, password)
VALUES('Stefan', 'JakubIsLebowski'),
    ('John', 'penis'),
    ('TheDude', 'weed'),
    ('Zdzislaw', 'GoodGod');
`)

db.public.none(`
--sql
INSERT INTO tasks (fk_user_id, title, description)
VALUES(
        1,
        'Take out the Garbage',
        'I gotta take the smelly shit out'
    ),
    (2, 'Maidenless?', 'Get some bitches'),
    (
        3,
        'SORT?',
        'How about you sort yourself some pussy?'
    );
`)

export const backup = db.backup();

export const mockTasksController = {
    getTasks: (mockReq: any, mockRes: any) => {
        const results = db.public.query('SELECT * FROM tasks;')
        return mockRes.status(StatusCodes.OK).json({
            message: 'Tasks fetched successfully',
            vals: results.rows
        })
    },
    getTaskById: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    createTask: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    deleteTaskById: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    patchTask: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    putTask: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    }
}

type User = {
    id: number,
    username: string,
    password: string,
    created_at: string,
    updated_at: string
}

const buildPatchedQuery = (table: string, id: number, data: User) => {
    if (Object.keys(data).length === 0) return null;
    let query = `UPDATE ${table} SET`;
    Object.entries(data).forEach(([key, value]) => {
        const valueToSet = typeof data[key as keyof User] === 'string' ? `'${value}'` : value;
        query += ` ${key} = ${valueToSet},`;
    });
    query = query.slice(0, -1);
    query += ` WHERE user_id = ${id} RETURNING *`;
    return query;
}

export const mockUsersController = {
    getUsers: (mockReq: any, mockRes: any) => {
        const results = db.public.query(`
        --sql
        SELECT * FROM users;
        `)

        return mockRes.status(StatusCodes.OK).json({
            message: 'Users fetched successfully',
            vals: results
        });
    },
    getUserById: (mockReq: any, mockRes: any) => {
        if (!/[(0-9)]/.test(mockReq.params.id)) {
            return mockRes.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid user id'
            })
        }
        const results = db.public.query(`SELECT * FROM users WHERE user_id = ${mockReq.params.id}`)
        return mockRes.status(StatusCodes.OK).json({
            message: 'User fetched successfully',
            vals: results
        })
    },
    createUser: async (mockReq: any, mockRes: any) => {
        let username_taken: boolean | QueryResult = false;

        if (mockReq.body.username === undefined || mockReq.body.password === undefined) {
            return mockRes.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid request. Check username and password details'
            })
        }

        if (mockReq.body.username && mockReq.body.password) {
            username_taken = db.public.query(`SELECT * FROM users WHERE username = '${mockReq.body.username}'`).rowCount > 0;

        }

        if (!username_taken) {
            const result = db.public.query(`INSERT INTO users(username, password) VALUES ('${mockReq.body.username}', '${mockReq.body.password}')`)
            return mockRes.status(StatusCodes.OK).json({
                message: 'User created successfully',
                vals: result
            })
        }

        return mockRes.status(StatusCodes.BAD_REQUEST).json({
            message: 'Username is already taken'
        })

    },
    deleteUserById: (mockReq: any, mockRes: any) => {
        db.public.query(`DELETE FROM users WHERE user_id = '${mockReq.params.id}'`);
        return mockRes.status(StatusCodes.OK).json({
            message: 'User successfully deleted'
        })
    },
    patchUser: async (mockReq: any, mockRes: any) => {
        const { username, password } = mockReq.body;
        const { user_id } = mockReq.params;
        let query: string;

        if (typeof user_id !== 'undefined' ||
            typeof username !== 'undefined' ||
            typeof password !== 'undefined') {
            query = buildPatchedQuery('users', mockReq.params.id, mockReq.body) as string;

            const res = db.public.query(query);
            return mockRes.status(StatusCodes.ACCEPTED).json({
                message: 'User updated',
                val: res
            })

        }

        return mockRes.status(StatusCodes.BAD_REQUEST).json({
            message: 'Bad Request, please check the body of your request'
        })
    },
    putUser: (mockReq: any, mockRes: any) => {
        backup.restore();
        const { user_id, username, password } = mockReq.body;
        let user_exists: boolean = false;

        if (typeof user_id !== 'undefined' &&
            typeof username !== 'undefined' &&
            typeof password !== 'undefined') {
            user_exists = db.public.query(`SELECT * FROM users WHERE user_id = '${user_id}'`).rowCount > 0;
        }

        if (user_exists) {
            db.public.query(`UPDATE users SET username = '${username}', password = '${password}' WHERE user_id = '${user_id}'`);

            return mockRes.status(StatusCodes.ACCEPTED).json({
                message: 'User successfully updated'
            })
        }

        return mockRes.status(StatusCodes.BAD_REQUEST).json({
            message: 'User not found'
        })
    }
}