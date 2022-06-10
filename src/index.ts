import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req: Request, res: Response) => {
    res.send('Task Manager App');
})

app.listen(port, console.log(`Listening on port ${port}...`)!);
