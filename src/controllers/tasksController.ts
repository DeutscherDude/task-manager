import { Request, Response } from 'express';
import { query } from './../db/psqlConnect';
import { StatusCodes } from './../util/statusCodes';
import { QueryResult } from 'pg';

const asyncHandler = require('express-async-handler')

type Task = {
    task_id: number,
    fk_user_id: number,
    title: string,
    description: string,
    status: boolean,
    created_at: string,
    updated_at: string
}

/**
 * @route GET /api/tasks/
 * @desc Return all tasks ever created
 * @param req Request object
 * @param res Response object
 */
export const getTasks = asyncHandler(async (req: Request, res: Response) => {
    new Promise<QueryResult<Task>>(() => {
        query('SELECT * FROM tasks;', [], (err, results: QueryResult<Task>) => {
            if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Internal server error",
                    error: err
                });
            } else {
                return res.status(StatusCodes.ACCEPTED).json(results.rows);
            }
        })
    });
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        message: 'Method not yet implemented'
    })
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
    const { fk_user_id, title, description } = req.body;
    await query('INSERT INTO tasks(fk_user_id, title, description) VALUES($1, $2, $3)',
        [fk_user_id, title, description], (err, results: QueryResult<Task>) => {
            if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal server error',
                    error: err
                });
            } else {
                return res.status(StatusCodes.CREATED).json(results.rows);
            }
        });
});

export const deleteTaskById = asyncHandler(async (req: Request, res: Response) => {

})

export const patchTask = asyncHandler(async (req: Request, res: Response) => {

})

export const putTask = asyncHandler(async (req: Request, res: Response) => {

})

