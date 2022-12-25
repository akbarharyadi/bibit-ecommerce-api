import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import UsersRepositories from "../repositories/UserRepositories";
import IUser from './../model/interface/IUser';

const GoogleStrategy = passportGoogle.Strategy;
const userRepo = new UsersRepositories();

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
            console.log(profile);
            let iProfile: IUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                familyName: profile.name?.familyName || '',
                givenName: profile.name?.givenName || '',
                email: profile.emails?.[0].value || '',
                photos: profile.photos?.[0].value || '',
            }
            const user = await userRepo.findByGoogleId(profile.id);
            // If user doesn't exist creates a new user. (similar to sign up)
            if (!user) {
                const newUser = await userRepo.create(iProfile);
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