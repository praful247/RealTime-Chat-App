import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import keys from "../config/keys.js";
import mongoose from "mongoose";
import passport from "passport";

const User = mongoose.model("users");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:
        "https://emailandpayment-2.onrender.com/auth/google/callback",
      proxy: true,
    },

    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
