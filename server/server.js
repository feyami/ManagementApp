import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoDbConnection from './configuration/mongoDbConfig.js';
import socketIo from './configuration/socketIo.js';
import path from 'path';

//* Importing Routes
import Routes from './routes/index.js';

import MongoStore from 'connect-mongo';

dotenv.config();
const app = express(); 

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// app.use(
//  cookieSession({
//   name: 'session',
//   keys: [process.env.COOKIE_KEY],
//   maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   // store: MongoStore.create({
//   //   mongoUrl: process.env.MONGO_URI, 
//   //   ttl: 24 * 60 * 60, // 1 day
//   // })
//   })
// );
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60, // 1 day
    }),
  })
)

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
const server=app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
})

socketIo(server); 



