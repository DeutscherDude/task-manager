import express, { Request, Response } from 'express';
import { StatusCodes } from '../util/statusCodes';

const router = express.Router();

router.route('/').get((req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: 'Healthcheck OK'
    });
});

router.all('*', (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: 'Not Found'
    });
});

export { router as healthcheckRouter };
