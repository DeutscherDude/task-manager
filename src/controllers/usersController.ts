import { Request, Response } from 'express';
import { query } from './../db/psqlConnect';

export const getUsers = async (req: Request, res: Response) => {
    await query('SELECT * FROM users', [], (err, results) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error",
                error: err
            });
        }
        res.status(200).json(results.rows);
    });
};
