import { Request, Response } from 'express';
import { query, pool } from './../db/psqlConnect';
import { StatusCodes } from './../util/statusCodes';
import asyncHandler from "express-async-handler"
import { QueryResult } from 'pg';

type User = {
    id: number,
    username: string,
    password: string,
    created_at: string,
    updated_at: string
}

/**
 * Query to build a patched Update query for the users table. 
 * It should NOT be used WITHOUT a middleware for verification of input. This would be a serious security risk.
 * @param table string
 * @param id number
 * @param data User
 * @returns 
 */
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

/**
 * @route GET /api/users
 * @access Private
 * @desc getUsers - returns all users
 * @param req Request object
 * @param res Response object
 */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    await query('SELECT * FROM users', [], (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            });
        } else {
            return res.status(StatusCodes.ACCEPTED).json(results.rows);
        }
    });
});

async function checkIfUsernameIsTaken(username: string):
    Promise<void | Error | QueryResult<any> | Response<any, Record<string, any>>> {
    const val = await query(`SELECT * FROM user WHERE username = $1`, [username], (err, res) => {
        if (err) {
            return err;
        }
        return res;
    })
    return val;
}

/**
 * @route GET /api/users/:id
 * @access Private
 * @desc Get a single user by id
 * @param req Request object
 * @param res Response object
 */
export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    if (!/[(0-9)]/.test(req.params.id)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid user id'
        })
    }
    await query('SELECT * FROM users WHERE user_id = $1', [req.params.id], (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            });
        } else {
            return res.status(StatusCodes.ACCEPTED).json(results.rows);
        }
    });
});

/**
 * @route POST /api/users
 * @access Private
 * @desc Create a new user
 * @param req Request object
 * @param res Response object
 */
export const createUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    // let username_taken: boolean | QueryResult = false;

    if (req.body.username === 'undefined' || req.body.password === 'undefined') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Body is missing username or password, are you passing them correctly?'
        });
    }

    if (await checkIfUsernameIsTaken(req.body.username))

        await query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.name, req.body.password], (err, results) => {
            if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Internal server error",
                    error: err
                });
            } else {
                return res.status(StatusCodes.ACCEPTED).json(results.rows[0]);
            }
        });
});

/**
 * @route DELETE /api/users/:id
 * @access Private
 * @desc Delete a user
 * @param req Request object
 * @param res Response object
 */
export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
    await query('DELETE FROM users WHERE user_id=$1', [req.params.id], (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            })
        } else {
            return res.status(StatusCodes.ACCEPTED).json({
                message: "User deleted"
            });
        }
    });
});

/**
 * Update a user using a patched query. Should be used ONLY with a middleware for verification of input. 
 * To learn more about why this is dangerous, read about SQL injection. This can be avoided using sqlize library or ORM in general.
 * @route PATCH /api/users/:id
 * @access Private
 */
export const patchUser = asyncHandler(async (req: Request, res: Response) => {
    const sql = buildPatchedQuery('users', parseInt(req.params.id), req.body);
    pool.query(sql!, (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            });
        }
        return res.status(StatusCodes.ACCEPTED).json(results.rows[0]);
    })
})

/**
 * @desc Update a user using a PUT method, effectivelly overriding the whole user if need be.
 * @route PUT /api/users/:id
 * @access Private
 */
export const putUser = asyncHandler(async (req: Request, res: Response) => {
    await query('UPDATE users SET username=$1, password=$2 WHERE user_id=$3', [req.body.name, req.body.password, req.body.id], (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            });
        } else {
            return res.status(StatusCodes.ACCEPTED).json(results.rows[0]);
        }
    });
})
