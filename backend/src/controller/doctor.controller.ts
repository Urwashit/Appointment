import { Router } from "express";
import {
  getAllDoctor,
  createDoctor,
  getAllDoctorFromDB,
  getDoctorByQuery,
} from "../services/doctor.service";

const router = Router();

router.post("/", createDoctor);

router.get("/", getAllDoctor);

router.get("/getAllDoctorFromDB", getAllDoctorFromDB);

router.get("/query", getDoctorByQuery);

export default router;
