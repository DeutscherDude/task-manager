import express, { Router } from 'express';
import logger from './../middleware/logger';

export default function (database: any): Router {
    /**
     * @desc Router for users. Handles all requests to /users
     * @return {void} void
     */
    const router = express.Router();

    router
        .route('/:id')
        .get(logger, database.getUserById)
        .patch(logger, database.patchUser)
        .put(logger, database.putUser)
        .delete(logger, database.deleteUserById);

    router
        .route('/')
        .get(logger, database.getUsers)
        .post(logger, database.createUser);

    return router;
}
