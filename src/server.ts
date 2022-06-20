import makeApp from './index';
import * as tasksController from './controllers/tasksController';
import * as usersController from './controllers/usersController';
import { provideStringEnvVar } from './util/envProvider';

const app = makeApp(tasksController, usersController);
const port = provideStringEnvVar('SERVER_PORT');


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
