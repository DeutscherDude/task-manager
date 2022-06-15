import { Request, Response } from 'express';
import { query } from './../db/psqlConnect';
import { StatusCodes } from './../util/statusCodes';
import asyncHandler from "express-async-handler"

/**
 * @route
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

/**
 * @route
 * @access Private
 * @desc Get a single user by id
 * @param req Request object
 * @param res Response object
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    await query('SELECT * FROM users WHERE user_id = $1', [parseInt(req.params.id)], (err, results) => {
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
 * @route
 * @access Private
 * @desc Create a new user
 * @param req Request object
 * @param res Response object
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    await query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [req.body.name, req.body.email, req.body.password], (err, results) => {
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
 * @route
 * @access Private
 * @desc Delete a user
 * @param req Request object
 * @param res Response object
 */
export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
    await query('DELETE FROM users WHERE user_id=$1', [req.body.id], (err, results) => {
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
