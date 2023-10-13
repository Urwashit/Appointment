import { Router } from "express";
import {
  createAppointment,
  editAppointment,
  getAllAppointment,
  getAllAppointmentByDoctorId,
  getAppointmentByQuery,
} from "../services/appointment.service";

const router = Router();

router.post("/", createAppointment);

router.put("/:id", editAppointment);

router.get("/query", getAppointmentByQuery);

router.get("/", getAllAppointment);

export default router;
