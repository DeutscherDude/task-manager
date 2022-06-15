import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import { usersRouter } from './routes/users';
import { healthcheckRouter } from './routes/healthcheck';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', usersRouter);
app.use('/api/healthcheck', healthcheckRouter);

app.use('/dummy', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(Number(process.env.SERVER_PORT), () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}...`);
})


export default app;
