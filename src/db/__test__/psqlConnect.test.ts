import * as request from 'supertest';
import app from '../../index';
import { connect } from '../psqlConnect';


describe('psqlConnect connection tests', () => {
    it('should connect to psql', async() => {
        await connect();
        expect(true).toBe(true);
    })
})

