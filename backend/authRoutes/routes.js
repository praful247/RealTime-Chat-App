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
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "http://localhost:5173/login",
    session:false, //using jwt 
  }),
  (req, res) => {
   
generatetokenandsetcookie(req.user._id, res);
   res.redirect("http://localhost:5173/"); // This will redirect the user to the home page
// res.send("✅ Google login success"); // This will log to your server console
  }
);

router.post("/api/logout", (req, res) => {
  // req.logout(function (err) {
  //   if (err) {
  //     return next(err);
  //   }
    res.cookie("jwt", "" ,{maxAge:0});
    res.status(201).json({message: "logged out successfully"});
    // res.send("Logged out successfully ");
  });


// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) return next();   // we are using jwt not cookie session
//   res.status(401).send("Not authenticated");
// }

router.get("/api/current_user", protectRoute, (req, res) => {
  res.send(req.user); /// it gives as response who logged in
});

export default router;
