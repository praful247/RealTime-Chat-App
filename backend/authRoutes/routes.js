import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("✅ Google login success");
  }
);

router.get("/api/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("Logged out successfully ");
  });
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user); /// it gives as response who logged in
});

export default router;
