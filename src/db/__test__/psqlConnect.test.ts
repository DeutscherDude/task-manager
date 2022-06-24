import { QueryResult } from 'pg';
import { query, getClient } from '../psqlConnect';

describe('psqlConnect connection tests', () => {

    it('should connect to psql', done => {
        getClient((err, client, done) => {
            if (err) {
                done(err);
                expect(err).toBeUndefined();
                console.log(err);
                throw err;
            }
            done(client);
            expect(client).toBeDefined();
        }).then(() => {
            done();
        }).catch(err => {
            done(err);
        });

    });

    it('query should return result', done => {
        function callback(err: Error, res: QueryResult): Error | QueryResult {
            if (err) {
                done(err);
                throw err;
            }
            expect(res).toBeDefined();
            console.log(res);
            done(res);
            return res;
        }

        query('SELECT 1', [], callback);
    });

    it('callback returns a value', done => {
        function callback(err: Error, data: QueryResult): Error | QueryResult {
            if (err) {
                done(err);
                return err
            }
            try {
                expect(data).toBeDefined();
                done();
                return data;
            } catch (err: any) {
                done(err);
                return err;
            }
        }

        query('SELECT 1', [], callback);
    });


});
