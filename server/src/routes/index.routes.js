import { Router } from "express";
import sessionRouter from "./session.routes.js";
import patientRouter from "./patient.routes.js";
import patientListRouter from "./patient-list.routes.js";
import testRouter from "./test.routes.js";

const router = Router()

router.use('/api/session', sessionRouter)
router.use('/api/patient', patientRouter)
router.use('/api/patientList', patientListRouter)
router.use('/api/test', testRouter)
router.use('/api/consults', testRouter)


export default router