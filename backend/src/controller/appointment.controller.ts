import { Router } from "express";
import {
  createAppointment,
  editAppointment,
  getAllAppointment,
  getAppointment,
} from "../services/appointment.service";

const router = Router();

router.post("/", createAppointment);

router.put("/", editAppointment);

router.get("/:id", getAppointment);

router.get("/", getAllAppointment);

export default router;
