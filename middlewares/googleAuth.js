// middlewares/googleAuth.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/userModel.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: '260025626940-7hqcddkib9nsd1m637qs7n7hmoqetrnk.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:8082/api/v1/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findOne({ googleId: profile.id });
                if (!user) {
                    user = await userModel.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    });
                    console.log(accessToken)
                    console.log(refreshToken)
                    console.log(profile)

                }
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

// Serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

export default passport;
