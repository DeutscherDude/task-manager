import makeApp from '../../index';
import { mockTasksController, mockUsersController } from '../../mocks/controllersMocks'
const request = require('supertest');


describe('Healthcheck route test', () => {
    let app: any;

    beforeAll(() => {
        app = makeApp(mockTasksController, mockUsersController);
    })

    it('basic healthcheck returns "Healthcheck OK" in the body', async () => {
        const res = await request(app).get('/api/healthcheck');
        expect(res.body).toEqual({
            message: 'Healthcheck OK'
        });
    });

    it('non-existing route returns "Not Found" in the body', async () => {
        const res = await request(app).get('/api/healthcheck/non-existing-route');
        expect(res.body).toEqual({
            message: 'Not Found'
        });
    });
})
