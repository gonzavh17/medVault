import { Router } from "express";
import passport from "passport";
import { loginGoogleAuth } from "../controller/session.controller.js";
import { logout } from "../controller/session.controller.js";

const googleRouter = Router();

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    // Llama a loginGoogle después de la autenticación exitosa
    loginGoogleAuth(req, res);
  }
);

googleRouter.get("/logout", logout);

googleRouter.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

export default googleRouter;
