import { Request, Response } from 'express';
import { query } from './../db/psqlConnect';
import { StatusCodes } from './../util/statusCodes';
import asyncHandler from "express-async-handler"

// type Task = {
//     task_id: number,
//     fk_user_id: number,
//     title: string,
//     description: string,
//     status: boolean,
//     created_at: string,
//     updated_at: string
// }

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
    await query('SELECT * FROM tasks;', [], (err, results) => {
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

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    console.log('boop');
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
    console.log('boop');
});

export const deleteTaskById = asyncHandler(async (req: Request, res: Response) => {
    console.log('boop');
})

export const patchTask = asyncHandler(async (req: Request, res: Response) => {
    console.log('boop');
})

export const putTask = asyncHandler(async (req: Request, res: Response) => {
    console.log('boop');
})
