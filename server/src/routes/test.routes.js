import { Router } from "express";
import { getAllPatients, test } from "../controller/test.controller.js";
import { isAuthenticated } from "../controller/patient-list.controller.js";

const testRouter = Router()

testRouter.get('/testCookie', test)
testRouter.get('/getAllPatients', isAuthenticated,  getAllPatients)

export default testRouter