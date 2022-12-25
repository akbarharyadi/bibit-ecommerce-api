import { CommonRoutes } from './common';
import express from 'express';
import { passport } from '../service/passport'
import { passport as passport_jwt } from '../service/passport_jwt'
import jwt from 'jsonwebtoken'
import { COOKIE_KEY } from '../config';

export class AuthRoutes extends CommonRoutes {
    configureRoutes() {

        this.app.route(`/auth/google`)
            .get(passport.authenticate("google", {
                scope: ["email", "profile"],
            })
        );

        this.app.route(`/auth/user`)
            .get(passport_jwt.authenticate('jwt', { session: false }), async (req: express.Request, res: express.Response) => {
                try {
                    res.status(200).send({ user: req.user })
                } catch (error) {
                    console.log(error)
                }
            });

        this.app.route(`/auth/google/redirect`)
            .get(passport.authenticate("google", { session: false }), async (req: express.Request, res: express.Response) => {
                let user: any = req.user;
                var payload = { google_id: user.google_id };
                var token = jwt.sign(payload, COOKIE_KEY);
                res.redirect("http://localhost:3000/login/" + token);
            });

        return this.app;
    }
    
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }
}