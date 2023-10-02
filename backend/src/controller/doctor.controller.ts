import { Router } from "express";
import {
  getAllDoctor,
  getDoctorById,
  createDoctor,
} from "../services/doctor.service";

const router = Router();

router.post("/", createDoctor);

router.get("/", getAllDoctor);

router.get("/:id", getDoctorById);

export default router;
