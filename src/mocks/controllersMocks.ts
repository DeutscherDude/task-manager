import { newDb } from 'pg-mem';

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
    ('TheDude', 'weed');
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
        return mockRes.status(200).json({
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

export const mockUsersController = {
    getUsers: (mockReq: any, mockRes: any) => {
        const results = db.public.query(`
        --sql
        SELECT * FROM users;
        `)
        return mockRes.status(200).json({
            message: 'Users fetched successfully',
            vals: results
        });
    },
    getUserById: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    createUser: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    deleteUserById: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    patchUser: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    },
    putUser: (mockReq: any, mockRes: any) => {
        return mockRes.status(200).json({

        })
    }
}