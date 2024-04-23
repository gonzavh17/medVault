import { Router } from "express";
import passport from "passport";
import { loginGoogleAuth } from "../controller/session.controller.js";
import { logout } from "../controller/session.controller.js";

// Crea una instancia del enrutador de Express
const googleRouter = Router();

// Configura la ruta para iniciar la autenticación de Google
googleRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
    accessType: "offline",
    prompt: "consent",
    responseType: 'code'
  })
);


// Configura la ruta para la autenticación de Google
googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "/auth/google/failure"
  }),
  (req, res) => {
    loginGoogleAuth(req, res);
  }
);

// Configura la ruta para cerrar sesión
googleRouter.get("/logout", logout);

// Configura la ruta para el manejo de fallos de autenticación de Google
googleRouter.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

// Exporta el enrutador
export default googleRouter;