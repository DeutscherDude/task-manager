import { Router } from 'express';
import {
    createTask,
    deleteTaskById,
    getTaskById,
    getTasks,
    patchTask,
    putTask
} from 'src/controllers/tasksController';
import logger from 'src/middleware/logger';

const router = Router();

router
    .route('/')
    .get(logger, getTasks)
    .post(logger, createTask)
    .put(logger, putTask)

router
    .route('/:id')
    .get(logger, getTaskById)
    .delete(logger, deleteTaskById)
    .patch(logger, patchTask)


export { router as tasksRouter };
