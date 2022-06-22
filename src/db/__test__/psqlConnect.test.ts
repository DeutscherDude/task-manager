import { query, getClient } from '../psqlConnect';

describe('psqlConnect connection tests', () => {

    it('should connect to psql', async () => {
        await getClient((err, client, done) => {
            expect(err).toBeFalsy();
            expect(client).toBeTruthy();
            expect(done).toBeTruthy();
            done();
        });
    });

    it('query should return result', async () => {
        await query('SELECT 1', [], (err, res)  => {
            expect(err).toBeFalsy();
            expect(res).toBeTruthy();
            return res;
        });
    })
});
