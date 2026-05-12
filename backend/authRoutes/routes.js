import express from "express";
import passport from "passport";
import generatetokenandsetcookie from "../utils/jwttokens.js";
import protectRoute from "../middleware/protectedroutes.js";
import { googleOAuthConfigured } from "../services/passport.js";
const router = express.Router();

const requireGoogleOAuth = (req, res, next) => {
	if (!googleOAuthConfigured) {
		return res
			.status(503)
			.type("text/plain")
			.send(
				"Google sign-in is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET on the server (e.g. GitHub Actions secrets passed into docker run)."
			);
	}
	next();
};

router.get(
  "/auth/google",
  requireGoogleOAuth,
  (req, res, next) => {
    console.log("🔁 Google auth route hit");
    next();
  },
  passport.authenticate("google", {
     prompt: 'consent select_account',
    scope: [
      "profile",
       "email",
       "https://www.googleapis.com/auth/user.gender.read",
    ],
  })
);

router.get(
  "/auth/google/callback",
  requireGoogleOAuth,
  passport.authenticate("google", { 
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/`,

    //  successRedirect: 'http://localhost:5173/home',
    session:false, //using jwt 
  }),
  (req, res) => {
   
generatetokenandsetcookie(req.user._id, res);
res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/home`);
// This will redirect the user to the home page
// res.send("✅ Google login success"); // This will log to your server console
  }
);

router.get("/api/logout", (req, res) => {
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
    res.cookie("jwt", "" ,{maxAge:0});
 
    res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/`);
    // res.send("Logged out successfully ");
  });


// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) return next();   // we are using jwt not cookie session
//   res.status(401).send("Not authenticated");
// }

router.get("/api/user", protectRoute, (req, res) => {
  res.send(req.user); /// it gives as response who logged in
});

export default router;
