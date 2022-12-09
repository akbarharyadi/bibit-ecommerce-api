import express from 'express';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as dotenv from 'dotenv'
import cors from 'cors';
import { CommonRoutes } from './routes/common';
import { AuthRoutes } from './routes/auth';
import debug from 'debug';


const app: express.Application = express();
const routes: Array<CommonRoutes> = [new AuthRoutes((app))];
const debugLog: debug.IDebugger = debug('app');
dotenv.config()

// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

const runningMessage = `Hello Bibit Mania`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

// app.use("/kue-api/", kue.app);

routes.forEach((route: CommonRoutes) => {
    debugLog(`Routes configured for ${route.getName()}`);
});


export default app;