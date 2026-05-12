import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import keys from "./../config/keys.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const User = mongoose.model("users");

const hasGoogleCreds = !!(
	keys.googleClientID &&
	keys.googleClientSecret &&
	String(keys.googleClientID).trim() &&
	String(keys.googleClientSecret).trim()
);

const frontendBase = (
	process.env.FRONTEND_URL || "https://realtime-chat-app-vqmj.onrender.com"
).replace(/\/+$/, "");

if (hasGoogleCreds) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: keys.googleClientID,
				clientSecret: keys.googleClientSecret,
				callbackURL: `${frontendBase}/auth/google/callback`,
				scope: [
					"profile",
					"email",
					"https://www.googleapis.com/auth/user.gender.read",
				],
				proxy: true,
			},

			async (accessToken, refreshToken, profile, done) => {
				try {
					const existingUser = await User.findOne({ googleID: profile.id });

					if (existingUser) {
						return done(null, existingUser);
					}

					const user = await new User({
						googleID: profile.id,
						username: profile.displayName,
						name: profile.displayName,
						email: profile.emails[0].value,
						gender: profile.gender,
						profilePic: profile.photos[0].value,
					}).save();
					done(null, user);
				} catch (err) {
					done(err, null);
				}
			}
		)
	);
} else {
	console.warn(
		"[auth] Google OAuth disabled: set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (e.g. in Docker / GitHub Actions secrets)."
	);
}

export const googleOAuthConfigured = hasGoogleCreds;
// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

export default passport;
