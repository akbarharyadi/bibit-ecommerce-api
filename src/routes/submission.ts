import { CommonRoutes } from './common';
import express from 'express';
import { passport as passport_jwt } from '../service/passport_jwt'
import SubmissionController from './../controller/submission_controller';

export class SubmissionRoutes extends CommonRoutes {
    controller: SubmissionController;

    configureRoutes() {
        this.app.route(`/submission`)
            .post(passport_jwt.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    let submission = await this.controller.create(req.body, req.user)
                    res.status(200).send({ submission })
                } catch (error) {
                    const err = error as TypeError
                    res.status(500).send({
                        message: err.message
                    })
                }
            });

        return this.app;
    }
    
    constructor(app: express.Application) {
        super(app, 'SubmissionRoute');
        this.controller = new SubmissionController()
    }
}