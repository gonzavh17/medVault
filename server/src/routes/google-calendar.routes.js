import { Router } from "express";
import { createEvent } from "../controller/googleCalendar.controller.js";

const googleCalendarRouter = Router()

googleCalendarRouter.post('/create/event', createEvent)

export default googleCalendarRouter