import express from 'express';
import cookieParser from "cookie-parser";
import { usersRouter } from './routes/users';
import { healthcheckRouter } from './routes/healthcheck';
import { tasksRouter } from './routes/tasks';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter)
app.use('/api/healthcheck', healthcheckRouter);

app.listen(Number(process.env.SERVER_PORT), () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}...`);
})


export default app;
