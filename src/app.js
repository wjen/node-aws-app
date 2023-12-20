import Express from 'express';
// import staticRoute from './routes/300.static';
import FS from 'fs';
import Path from 'path';

const port = process.env.port || 8000;
const app = Express();

app.set('views', 'www/view');
app.set('view engine', 'ejs');
loadRoutes();

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
});

// capture interrupt and terminaation signal
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

// closing server will stop our server from hanging and taking up the terminal
function stop() {
    server.close();
    process.exit();
}

async function loadRoutes(path = process.env.routes || 'src/routes') {
    // const wwwPath = process.env.www || 'www';
    // app.use(Express.static(wwwPath));
    // app.use(staticRoute);
    if (!FS.existsSync(path)) return;
    const contents = FS.readdirSync(path).sort();

    for (const entry of contents) {
        const fullpath = Path.join(process.cwd(), path, entry);
        const { default: route } = await import(fullpath);
        app.use(route);
    }
}
