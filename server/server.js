import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import passportGoogle from './configuration/passportGoogleConfig.js';
import MongoDbConnection from './configuration/mongoDbConfig.js';

dotenv.config();
const app = express();
app.use(
  session({
    secret: "codefcom",
    resave: true,
    saveUninitialized: true,
}));
// Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })



MongoDbConnection();
passportGoogle();
const port=process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
})












 

app.get("/", (req, res) => {
  res.send("Helllo WOlrd");
})

app.get("/getuser", (req, res) => {
  res.send(req.user);
})

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send("done");
  }
})

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:3000", session: true }),
  function (req, res) {
    res.redirect('http://localhost:3000');
  }
);
