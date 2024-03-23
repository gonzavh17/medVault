import { Router } from "express";
import { addConstultationToPatient, deletePatient, filterPatientsAlphabetically, getPatientById, getPatientList, isAuthenticated, updatePatient } from "../controller/patient-list.controller.js";

const patientListRouter = Router()

patientListRouter.get('/getPatientList', isAuthenticated , getPatientList)
patientListRouter.get('/getPatientById/:patientId', getPatientById)
patientListRouter.delete('/deletePatient/:patientId', deletePatient)
patientListRouter.get('/updatePatient/:patientId', updatePatient)
patientListRouter.get('/getPatientsAlphabetically', filterPatientsAlphabetically)
patientListRouter.put('/consultation/:patientId', addConstultationToPatient)

export default patientListRouter