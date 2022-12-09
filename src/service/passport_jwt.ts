import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { UsersRepositories } from "../repositories/user";
import { COOKIE_KEY } from '../config';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: COOKIE_KEY
}

passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
        console.log('payload received', jwt_payload);
        // usually this would be a database call:
        // get profile details
        // save profile details in db
        let userRepo = new UsersRepositories();
        const user: any = await userRepo.findByGoogleId(jwt_payload.google_id);
        // If user doesn't exist creates a new user. (similar to sign up)

        done(null, user);
    })
);

export { passport } 