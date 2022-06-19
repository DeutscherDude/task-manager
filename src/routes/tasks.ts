import { Router } from 'express';
import {
    createTask,
    deleteTaskById,
    getTaskById,
    getTasks,
    patchTask,
    putTask
} from '../controllers/tasksController';
import logger from '../middleware/logger';

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
