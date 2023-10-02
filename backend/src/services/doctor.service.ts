import { Request, Response, NextFunction } from "express";
import { Doctor } from "../models/doctor.model";
import { verifyToken } from "./auth.service";
import { create, findAll, findOne, update } from "../dao/doctor.dao";
import axios from "axios";

export const getDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`GetUser User : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    const doctor = await findOne({ _id: req.params.id });
    if (!doctor) {
      res.redirect("/");
    } else {
      res.status(200).json(doctor);
    }
  }
};

export const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`GetUser User : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    const doctor = await create(req.body);
    if (!doctor) {
      res.redirect("/");
    } else {
      res.status(200).json(doctor);
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
    console.error(`GetUser User : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    try {
      const { data, status } = await axios.get(
        "https://myupchar.com/api/v1/get_live_doctors_for_third_party?lang=en&telephone=8600852610&age=35&sex=NA&key=su4Birn86NJv6z-ZL3r84sxMYk-1b8cpzGdu",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log("response status is: ", status);
      res.status(200).json(data);
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
