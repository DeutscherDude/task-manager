import db from '../psqlConnect';

describe('psqlConnect connection tests', () => {
    it('should connect to psql', async () => {
        db.runMigrations();
        
    })
})

