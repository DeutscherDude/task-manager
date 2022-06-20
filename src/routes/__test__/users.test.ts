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
        it('should return status 200 and three users', async () => {
            const res = await request(app).get('/api/users')
            .set('Accept', 'application/json');
            console.log(res.headers["content-type"]);
            expect(res.headers['content-type']).toMatch(/json/);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                message: 'Users fetched successfully',
                vals: {
                    rows: [
                        {

                        },
                        {

                        },
                        {

                        }
                    ]
                }
            })
        })
    });

    describe('GET /api/users/:id returns a user by id', () => {
        it('providing a valid id returns the user with said id', async () => {

        })
    })

})
