import { Router } from "express";
import { createPatient } from "../controller/patients.controller.js";

const patientRouter = Router()

patientRouter.post('/createPatient', createPatient)

export default patientRouter