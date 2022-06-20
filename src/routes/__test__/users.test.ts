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
        app = makeApp(mockTasksController, mockUsersController) as Application;
    })

    describe('GET /api/users returns all users', () => {
        it('should return status 200 and three users', async () => {
            const res = await request(app).get('/api/users')
                .set('Accept', 'application/json')
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
            const res = await request(app).get('/api/users/1')
                .set('Accept', 'application/json')
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                message: 'User fetched successfully',
                vals: {
                    rows: [
                        {
                            user_id: 1,
                            username: 'Stefan',
                            password: 'JakubIsLebowski'
                        }
                    ]
                }
            })
        })

        it('providing an invalid id returns 400 Error', async () => {
            const res = await request(app).get('/api/users/invalid-id')
                .set('Accept', 'application/json')
            expect(res.status).toBe(400);
            expect(res.body).toMatchObject({
                message: 'Invalid user id'
            });
        })
    })

    describe('POST /api/users create a user', () => {
        it('should return status 200 and username, given all correct values', async () => {
            const res = await request(app).post('/api/users')
                .set('Accept', 'application/json')
                .send({
                    username: 'Kok',
                    password: 'WhereAreMyBallsSummers?'
                });
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User created successfully');
        })

        it('should return status code 400, given no username', async () => {
            const res = await request(app).post('/api/users')
                .set('Accept', 'application/json')
                .send({ password: "WhereAreMyBalls?!" });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid request. Check username and password details');
        })

        it('should return status code 400, given no password', async () => {
            const res = await request(app).post('/api/users')
                .set('Accept', 'application/json')
                .send({ username: 'Zdzislaw' });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid request. Check username and password details');
        })

        it('should not create a user with a username that is already taken', async () => {
            const res = await request(app).post('/api/users')
                .set('Accept', 'application/json')
                .send({ username: 'Zdzislaw', password: 'GoodGod' });
            expect(res.status).toBe(400);

        })

    })

    describe('DELETE /api/users deletes a user', () => {
        it('should delete a user given a valid user_id', async () => {
            const res = await request(app).delete('/api/users/1')
                .set('Accept', 'application/json');
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User successfully deleted');
        })
    })

})
