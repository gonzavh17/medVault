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
        let user = await userModel.findOne({ googleId: profile.id });
        if (user) {
          // Si el usuario existe, actualiza la autenticación de Google y guarda el refresh token si es necesario
          user.isGoogleAuthenticated = true;
          if (refreshToken) {
            user.googleRefreshToken = refreshToken;
          }
          console.log(refreshToken)
          await user.save();
          return done(null, user);
        } else {
          // Si el usuario no existe, crea un nuevo usuario y guarda el refresh token si es necesario
          user = await userModel.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            isGoogleAuthenticated: true,
            // Puedes guardar el refresh token si lo proporciona Google
            googleRefreshToken: refreshToken ? refreshToken : null,
        });
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )

);