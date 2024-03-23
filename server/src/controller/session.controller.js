import path from "path";
import userModel from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { serialize } from "v8";

export const register = async (req, res) => {
  try {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      occupation: req.user.occupation,
      gender: req.user.gender,
    };

    console.log(req.session.user);

    const token = generateToken(req.session.user);
    res.cookie("jwtCookie", token, {
      maxAge: 43200000,
    });

    res.status(200).send({ payload: req.session.user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: `Error al registrar usuario: ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).send({ error: `Error al iniciar sesion` });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      occupation: req.user.occupation,
      gender: req.user.gender,
      patientList: req.user.patientList
    };

    const token = generateToken(req.session.user);

    res.cookie("jwtCookie", token, {
      maxAge: 43200000,
      path: '/'
    });

    res.status(200).send({ payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};

export const currentSession = async (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send({error: "No session available"});
  }
};


export const logout = async (req, res) => {
  if (req.session.user) {
    try {
      req.session.destroy();
      res.clearCookie("jwtCookie");
      res.status(200).send({ resultado: "Has cerrado sesion" });
    } catch (error) {
      res.status(400).send({ error: `Error al cerrar sesion: ${error}` });
    }
  } else {
    res.status(400).send({ error: `No hay sesion iniciada` });
  }
};
