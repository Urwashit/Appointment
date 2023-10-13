import { Request, Response, NextFunction } from "express";
import { Doctor } from "../models/doctor.model";
import { verifyToken } from "./auth.service";
import { create, findAll, findOne, update } from "../dao/doctor.dao";
import axios from "axios";

export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`createDoctor : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    try {
      const doctorFound = await findOne({ docName: req.body.docName });
      if (doctorFound) {
        res
          .status(400)
          .json({ error: "Doctor with given name already exists" });
      }
      const doctor = await create(req.body);
      if (!doctor) {
        res.redirect("/");
      } else {
        res.status(200).json(doctor);
      }
    } catch (e) {
      console.error("Error while creating doctor", e);
      res.status(400).json({ error: "Error while creating doctor" });
    }
  }
};

export const getAllDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`getAllDoctor : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    let doctors: { doctor: string; speciality: string }[] = [];
    try {
      const { data, status } = await axios.get(
        "https://myupchar.com/api/v1/get_live_doctors_for_third_party?lang=en&telephone=8600852610&age=35&sex=NA&key=su4Birn86NJv6z-ZL3r84sxMYk-1b8cpzGdu",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(
        JSON.stringify(data.data.livedoctor.live_doctor_list, null, 4)
      );

      // 👇️ "response status is: 200"
      console.log("response status is: ", status);
      if (
        data.data.livedoctor.live_doctor_list &&
        data.data.livedoctor.live_doctor_list.length
      ) {
        data.data.livedoctor.live_doctor_list.forEach((doc: any) => {
          const { name, speciality } = doc;
          doctors.push({ doctor: name, speciality });
        });
      }
      res.status(200).json(doctors);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
};

export const getAllDoctorFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const doctors = await findAll({});
  if (!doctors || !doctors.length) {
    res.status(404).json({ error: "Doctors not found" });
  }
  res.status(200).json(doctors);
};

export const getDoctorByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { docName, userId, id } = req.query;
  let doctor;
  if (id) {
    doctor = await findOne({ _id: id });
    return res.status(200).json(doctor);
  }
  if (docName) {
    doctor = await findOne({ docName });
    return res.status(200).json(doctor);
  }
  if (userId) {
    doctor = await findOne({ userId });
    return res.status(200).json(doctor);
  }

  if (!doctor) {
    console.log("!doctor");
    res.status(400).json({ error: "Doctor Not Found" });
  }
};
