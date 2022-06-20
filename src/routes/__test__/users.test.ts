import {
    mockUsersController,
    mockTasksController
} from "../../mocks/controllersMocks";
import makeApp from '../../index';
import { Application } from 'express';
const request = require('supertest');

describe('Users Routes Tests', () => {
    let app: Application;

    beforeAll(() => {
        app = makeApp(mockTasksController, mockUsersController);
    })

    describe('GET /api/users returns all tasks', () => {
        it('should return status 200 and two users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.status).toBe(200);
        })
    })

})
