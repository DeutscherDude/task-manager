import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req: Request, res: Response) => {
    res.status(200);
    res.send('Task Manager App');
})

export default app;
