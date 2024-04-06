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

export const updateUser = async (req, res) => {
  try {
    
    const {id} = req.params
    const{ body } = req

    const existingUser = await userModel.findById(id)


    if(!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (body.password) {
      delete body.password;
    }


    await userModel.findByIdAndUpdate(id, body, {new: true})
    return res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
}


export const currentSession = async (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send({error: "No session available"});
  }
};


export const logout = async (req, res) => {
  if (req.session.passport && req.session.passport.user) {
    try {
      const user = req.session.passport.user;
      if (req.isAuthenticated()) {
        req.session.destroy(() => {
          console.log("Sesión destruida");
          res.clearCookie("jwtCookie");
          res.redirect("/");
        });
      } else if (user.googleId) {
        console.log("Usuario autenticado con Google");
        req.logOut(); 
        req.session.destroy(() => {
          console.log("Sesión destruida");
          res.send("Goodbye!");
        });
      } else {
        console.log("No se detectó ninguna estrategia de inicio de sesión");
        res.status(400).send({ error: "No se detectó ninguna estrategia de inicio de sesión" });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      res.status(400).send({ error: `Error al cerrar sesión: ${error}` });
    }
  } else {
    console.log("No hay sesión iniciada");
    res.status(400).send({ error: "No hay sesión iniciada" });
  }
};



// GOOGLE AUTH


export const loginGoogleAuth = async (req, res) => {
  try {
    const { profile } = req.user;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await userModel.findOne({ googleId: profile.id });
    
    if (existingUser) {
      // Si el usuario existe, simplemente devolverlo
      const { displayName, email } = existingUser;
      const user = { displayName, email };

      const token = generateToken(req.session.user);

      // Configurar la cookie
      res.cookie("jwtCookie", token, {
        maxAge: 43200000,
        httpOnly: true, // Asegúrate de configurar las opciones de seguridad adecuadas para tu cookie
      });

      // Enviar la respuesta con el payload del usuario existente
      return res.status(200).send({ payload: user });
    } else {
      // Si el usuario no existe, crear uno nuevo
      const newUser = await userModel.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.email,
      });

      const { displayName, email } = newUser;
      const user = { displayName, email };

      const token = generateToken(req.session.user);

      // Configurar la cookie
      res.cookie("jwtCookie", token, {
        maxAge: 43200000,
        httpOnly: true, // Asegúrate de configurar las opciones de seguridad adecuadas para tu cookie
      });

      // Enviar la respuesta con el payload del nuevo usuario creado
      return res.status(200).send({ payload: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: `Error al iniciar sesión ${error}` });
  }
};
