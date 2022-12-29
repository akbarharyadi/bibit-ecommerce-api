import express from 'express';

import * as dotenv from 'dotenv'
import { CommonRoutes } from './routes/common';
import { AuthRoutes } from './routes/auth';
import { SubmissionRoutes } from './routes/submission';


const app: express.Application = express();
const routes: Array<CommonRoutes> = [new AuthRoutes((app)), new SubmissionRoutes((app))];
dotenv.config()


const runningMessage = `Hello Bibit Mania`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
});

export default app;