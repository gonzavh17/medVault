// Dependencies

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from 'express-session'
import passport from "passport";
import MongoStore from 'connect-mongo'
import cors from 'cors'
import './config/googleAuth.js'

// Imports

import initializePassport from "./config/passport.js";
import router from "./routes/index.routes.js";

const app = express()
const PORT = 8080

// Cors



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// Server




//DB Connection

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD conectada");
  })
  .catch((error) =>
    console.log("Error en conexion con MongoDB Atlas: ", error)
  );

// Middlewares


app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 5400 
  })
}))
initializePassport()

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use((req, res, next) => {
res.on('finish', () => {
  console.log('Cookies enviadas en la respuesta:', res.getHeaders()['set-cookie']);
});
next();
}); */


app.use('/', router)

app.get("/", (req, res) => {
    res.send("Hello World");
  });

app.get("*", (req, res) => {
    res.status(404).send("Error 404");
  });

  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});