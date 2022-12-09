import express from 'express';
import cors from 'cors';
export abstract class CommonRoutes {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.app.use(cors());
        this.configureRoutes();
    }
    
    getName() {
        return this.name;
    }
    
    abstract configureRoutes(): express.Application;
}