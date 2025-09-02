import express from "express";
import passport from "passport";
import generatetokenandsetcookie from "../utils/jwttokens.js";
import protectRoute from "../middleware/protectedroutes.js";
const router = express.Router();

router.get(
  "/auth/google",
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
