import { Schema, model } from "mongoose";
import PatientListModel from "./patient-list.model.js";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  occupation: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["masculino", "femenino", "otro"],
  },
  patientList: {
    type: Schema.Types.ObjectId,
    ref: "PatientList",
  },
  googleId: String, 
  googleAccessToken: String, 
  googleRefreshToken: String, 
  username: {
    type: String
  },
  isGoogleAuthenticated: {
    type: Boolean,
    default: false, 
  },
  googleRefreshToken: String,
});

userSchema.plugin(findOrCreate)
userSchema.pre("save", async function (next) {
  try {
   // Verificar si el displayName tiene dos nombres
   if (this.username) {
    // Verificar si el displayName tiene dos nombres
    if (this.username.split(" ").length > 1 && this.isGoogleAuthenticated) {
      const names = this.username.split(" ");
      // Asignar el primer nombre al campo first_name
      this.first_name = names[0];
      // Asignar el segundo nombre al campo last_name
      this.last_name = names.slice(1).join(" ");
    } else {
      // Si solo hay un nombre, asignarlo al campo first_name y dejar last_name vacío
      this.first_name = this.username;
      this.last_name = "";
    }
  }

    const patientList = new PatientListModel();
    await patientList.save();

    this.patientList = patientList._id;
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = model("User", userSchema);

export default userModel;