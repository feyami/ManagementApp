import express from 'express'
import passport from 'passport';


const router = express.Router()
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Error when login",
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
    session: true
  })
);



export default router
