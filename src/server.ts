import makeApp from './index';
import * as tasksController from './controllers/tasksController';
import * as usersController from './controllers/usersController';
import { provideStringEnvVar } from './util/envProvider';
import { Application } from 'express';

const app = makeApp(tasksController, usersController) as Application;
const port = provideStringEnvVar('SERVER_PORT');


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
