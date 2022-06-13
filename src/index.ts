import app from './app';

const start = (port: number) => {
    try {
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

start(Number(process.env.SERVER_PORT));
