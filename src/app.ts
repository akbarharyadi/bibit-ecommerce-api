import express from 'express';

import * as dotenv from 'dotenv'
import cors from 'cors';
import { CommonRoutes } from './routes/common';
import { AuthRoutes } from './routes/auth';
import { Server, createServer } from 'http';


const app: express.Application = express();
const routes: Array<CommonRoutes> = [new AuthRoutes((app))];
dotenv.config()


const runningMessage = `Hello Bibit Mania`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});


const server: Server = createServer(app);
const hostname = '0.0.0.0';
const port = 4000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });


export default app;