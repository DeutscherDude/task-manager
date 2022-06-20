import makeApp from './index';
import * as tasksController from './controllers/tasksController';

const app = makeApp(tasksController);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening on port ${process.env.SEVER_PORT}`);
})
