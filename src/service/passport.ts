import axios from "axios";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";
import IUser from '../model/interface/user';
import UsersRepositories from "../repositories/user_repositories";

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
            let url: any = profile.photos?.[0].value
            let returnedB64: string = ''
            if (url) {
                let image = await axios.get(url, {responseType: 'arraybuffer'});
                returnedB64 = Buffer.from(image.data).toString('base64');
            }
            let user_data: IUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                familyName: profile.name?.familyName || '',
                givenName: profile.name?.givenName || '',
                email: profile.emails?.[0].value || '',
                photos: returnedB64,
            }
            const user = await userRepo.findByGoogleId(profile.id);
            // If user doesn't exist creates a new user. (similar to sign up)
            if (!user) {
                const newUser = await userRepo.create(user_data);
                if (newUser) {
                    done(null, newUser);
                }
            } else {
                await user.update(user.id, user_data);
                done(null, user);
            }
        }
    )
);

export { passport } 