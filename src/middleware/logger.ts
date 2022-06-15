import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';

const logger = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${res.get('Content-Length')}`;
        fs.appendFile('log.txt', log + '\n', (err) => {
            if (err) {
                console.log(err);
            }
        }
        );
    })
    next();
}

export default logger;