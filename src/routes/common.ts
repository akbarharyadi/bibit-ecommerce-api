import express from 'express';
import cors from 'cors';
export abstract class CommonRoutes {
    app: express.Application;
    nameRoute: string;

    constructor(app: express.Application, nameRoute: string) {
        this.app = app;
        this.nameRoute = nameRoute;
        this.app.use(cors());
        this.configureRoutes();
    }
    
    getName() {
        return this.nameRoute;
    }
    
    abstract configureRoutes(): express.Application;
}