import express from 'express';
import cookieParser from "cookie-parser";
import makeTasksRouter from './routes/tasks';
import makeUsersRouter from './routes/users';
import { healthcheckRouter } from './routes/healthcheck';

export default function (tasksController: any, usersController: any): express.Application {
    const app = express();
    const tasksRouter = makeTasksRouter(tasksController);
    const usersRouter = makeUsersRouter(usersController);

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/api/users', usersRouter);
    app.use('/api/healthcheck', healthcheckRouter);
    app.use('/api/tasks', tasksRouter!)

    return app;
}
