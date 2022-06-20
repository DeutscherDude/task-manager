import express from 'express';
import cookieParser from "cookie-parser";
import makeTasksRouter from './routes/tasks';
import makeUsersRouter from './routes/users';
import { healthcheckRouter } from './routes/healthcheck';

export class AppStartError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AppStartError';
    }
} 

export default function (tasksController: any, usersController: any): express.Application | AppStartError {
    try {
        const app = express();
        const tasksRouter = makeTasksRouter(tasksController);
        const usersRouter = makeUsersRouter(usersController);
    
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    
        app.use('/api/users', usersRouter);
        app.use('/api/healthcheck', healthcheckRouter);
        app.use('/api/tasks', tasksRouter)
    
        return app;
    } catch {
        return new AppStartError('Could not start the app');
    }
}
