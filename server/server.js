import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoDbConnection from './configuration/mongoDbConfig.js';
import path from 'path';
//* Importing Routes
import Routes from './routes/index.js';

import MongoStore from 'connect-mongo';

dotenv.config();
const app = express(); 

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://fcom:asdf1234@cluster0.qluokjc.mongodb.net/xxx?retryWrites=true&w=majority',
      ttl: 12 * 60 * 60,
    })
}));
// Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));


 app.use("/",Routes);

MongoDbConnection();

const port=process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
})




