import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import passportGoogle from './configuration/passportGoogleConfig.js';
import MongoDbConnection from './configuration/mongoDbConfig.js';
import authRoutes from './routes/auth.js';
dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));
// Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hi");
})



MongoDbConnection();
passportGoogle();
const port=process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
})




