import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import { UsersRepositories } from "../repositories/user";
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            // get profile details
            // save profile details in db
            let userRepo = new UsersRepositories();
            const user = await userRepo.findByGoogleId(profile.id);
            // If user doesn't exist creates a new user. (similar to sign up)
            if (!user) {
                const newUser = await userRepo.create(profile);
                if (newUser) {
                    done(null, newUser);
                }
            } else {
                done(null, user);
            }
        }
    )
);

export { passport } 