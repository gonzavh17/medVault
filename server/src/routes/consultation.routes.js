import { Router } from "express";
import { addConstultationToPatient, deleteConsult } from "../controller/consultation.controller.js";

const consultsRouter = Router()

consultsRouter.put('/createConsult/:patientId', addConstultationToPatient)
consultsRouter.delete('/:patientId/deleteConsult/:consultationId', deleteConsult)

export default consultsRouter