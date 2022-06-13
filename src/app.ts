import express, { Request, Response } from 'express';

const app = express();

app.get('/hello', (req: Request, res: Response) => {
    res.status(200);
    res.send('Task Manager App');
})

export default app;
