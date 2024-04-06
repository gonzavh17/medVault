import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";
import userModel from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        scope: ["email", "profile"],
        passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {
        try {
            const existingUser = await userModel.findOne({ googleId: profile.id });

            if (existingUser) {
            return done(null, existingUser);
            } else {
            const newUser = await userModel.create({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value 
            });
            return done(null, newUser);
            }
        } catch (error) {
            return done(error);
        }
        }
    )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
