import express from "express";
import { AppointmentController } from "../../controllers/appointment.controller";
const appointmentRouter = express.Router();

// Appointment routes
appointmentRouter.post("/", AppointmentController.createAppointment);
appointmentRouter.get("/:id", AppointmentController.getAppointmentById);
appointmentRouter.put("/:id", AppointmentController.updateAppointment);
appointmentRouter.delete("/:id", AppointmentController.deleteAppointment);
