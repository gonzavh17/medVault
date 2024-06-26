import { Router } from "express";
import "dotenv/config";
import {
  login,
  register,
  currentSession,
  logout,
  updateUser
} from "../controller/session.controller.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  register
);
sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  login
);
sessionRouter.get('/current', currentSession);
sessionRouter.get("/logout", logout);
sessionRouter.put("/updateUser/:id", updateUser);

export default sessionRouter;