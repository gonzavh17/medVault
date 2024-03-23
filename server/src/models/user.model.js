import { Schema, model } from "mongoose";
import PatientListModel from "./patient-list.model.js";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["masculino", "femenino", "otro"],
  },
  patientList: {
    type: Schema.Types.ObjectId,
    ref: "patientLists",
  },
});

userSchema.pre("save", async function (next) {
  try {

    const patientList = new PatientListModel();
    await patientList.save();

    this.patientList = patientList._id;
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = model("users", userSchema);

export default userModel;
