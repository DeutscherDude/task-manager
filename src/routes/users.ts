import express from 'express';
import logger from './../middleware/logger';
import { getUsers, getUserById, createUser } from '../controllers/usersController';

/**
 * @desc Router for users. Handles all requests to /users
 * @return {void} void
 */
const router = express.Router();

router
    .route('/')
    .get(logger, getUsers)
    .post(logger, createUser);

router
    .route('/:id') 
    .get(logger, getUserById);


export { router as usersRouter };
