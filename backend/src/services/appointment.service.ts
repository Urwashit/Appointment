import { Request, Response, NextFunction } from "express";
import { Appointment } from "../models/appointment.model";
import { create, findAll, findOne, update } from "../dao/appointment.dao";
import { getToken, verifyToken } from "./auth.service";
import { request } from "http";

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`createAppointment : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    try {
      const appointment = await create(req.body);
      if (!appointment) {
        res.redirect("/");
      } else {
        res.status(200).json(appointment);
      }
    } catch (e) {
      console.error(`Error while booking appointment`, e);
      res.status(200).json({ error: `Error while booking appointment` });
    }
  }
};

export const editAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`editAppointment: Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    const appointment = await update({ _id: req.params.id }, req.body);
    if (!appointment) {
      res.redirect("/");
    } else {
      res.status(200).json(appointment);
    }
  }
};

export const getAppointmentByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { doctorId, id, appointmentStatus } = req.query;

  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`getAppointmentByQuery : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    let appointments;
    if (doctorId) {
      appointments = await findAll({ doctorId });
      return res.status(200).json(appointments);
    }
    if (appointmentStatus) {
      appointments = await findAll({ appointmentStatus });
      return res.status(200).json(appointments);
    }
    if (id) {
      appointments = await findOne({ _id: id });
      return res.status(200).json([appointments]);
    }
    if (!appointments) {
      console.log("!appointments");
      res.status(400).json({ error: "Appointments Not Found" });
    }
  }
};

export const getAllAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(`getAllAppointment User : Unauthorized access token`);
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    const appointment = await findAll({});
    if (!appointment) {
      res.redirect("/");
    } else {
      res.status(200).json(appointment);
    }
  }
};

export const getAllAppointmentByDoctorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receivedToken = req.headers?.authorization || null;
  const verify = verifyToken(receivedToken);
  if (verify == undefined || verify == null || verify == "") {
    console.error(
      `getAllAppointmentByDoctorId User : Unauthorized access token`
    );
    return res.status(410).json({ error: "Unauthorized access token." });
  } else {
    const appointment = await findAll({ doctorId: req.params.doctorId });
    if (!appointment) {
      res.redirect("/");
    } else {
      res.status(200).json(appointment);
    }
  }
};
