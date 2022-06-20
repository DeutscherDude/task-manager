import { Router } from 'express';
import logger from '../middleware/logger';

export default function (database: any) {
    const router = Router();
    router
        .route('/')
        .get(logger, database.getTasks)
        .post(logger, database.createTask)
        .put(logger, database.putTask)

    router
        .route('/:id')
        .get(logger, database.getTaskById)
        .delete(logger, database.deleteTaskById)
        .patch(logger, database.patchTask)

    return router;
}
