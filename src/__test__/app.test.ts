import app from '../app';
import { Response } from 'express';
const request = require('supertest');

describe('App tests', () => {

    it('should return "Task Manager App"', async () => {
        return request(app)
            .get('/hello')
            .then((res: Response) => {
                expect(res.status).toBe(200);
            });
    });
});
