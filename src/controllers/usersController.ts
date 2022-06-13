import { Request, Response } from 'express';
import { query } from './../db/psqlConnect';
import { StatusCodes } from './../util/statusCodes';

/**
 * @route
 * @access Private
 * @desc getUsers - returns all users
 * @param req Request object
 * @param res Response object
 */
export const getUsers = async (req: Request, res: Response) => {
    await query('SELECT * FROM users', [], (err, results) => {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            });
        }
        res.status(StatusCodes.ACCEPTED).json(results.rows);
    });
};

/**
 * @route
 * @access Private
 * @desc Get a single user by id
 * @param req Request object
 * @param res Response object
 */
export const getUserById = async (req: Request, res: Response) => {
    await query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, results) => {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            });
        }
        res.status(StatusCodes.ACCEPTED).json(results.rows);
    });
}

/**
 * @route
 * @access Private
 * @desc Create a new user
 * @param req Request object
 * @param res Response object
 */
export const createUser = async (req:Request, res: Response) => {
    await query('INSERT INTO users(username, password) VALUES($1, $2)', [req.body.name, req.body.password], (err, results) => {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            });
        }
        res.status(StatusCodes.ACCEPTED).json({
            message: "User created"
        });
    })
}

/**
 * @route
 * @access Private
 * @desc Delete a user
 * @param req Request object
 * @param res Response object
 */
export const deleteUserById = async (req: Request, res: Response) => {
    await query('DELETE FROM users WHERE user_id=$1', [req.params.id], (err, results) => {
        if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
                error: err
            })
        }
        res.status(StatusCodes.ACCEPTED).json({
            message: "User deleted"
        });
    });
}
