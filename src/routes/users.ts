import express from 'express';
import logger from './../middleware/logger';
import { 
    getUsers, 
    getUserById, 
    createUser, 
    patchUser,
    putUser, 
    deleteUserById 
} from '../controllers/usersController';

/**
 * @desc Router for users. Handles all requests to /users
 * @return {void} void
 */
const router = express.Router();

router
    .route('/:id') 
    .get(logger, getUserById)
    .patch(logger, patchUser)
    .put(logger, putUser)
    .delete(logger, deleteUserById);

router
    .route('/')
    .get(logger, getUsers)
    .post(logger, createUser)

export { router as usersRouter };
