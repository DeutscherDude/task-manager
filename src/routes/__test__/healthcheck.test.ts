import app from '../../index';
const request = require('supertest');


describe('Healthcheck route test', () => {
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
