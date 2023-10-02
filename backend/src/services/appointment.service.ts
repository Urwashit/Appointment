import { Request, Response, NextFunction } from "express";
import { Appointment } from "../models/appointment.model";
import { create, findAll, findOne, update } from "../dao/appointment.dao";
import { getToken, verifyToken } from "./auth.service";

export const createAppointment = async (
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
    const appointment = await create(req.body);
    console.log("response", appointment);
    if (!appointment) {
      res.redirect("/");
    } else {
      res.status(200).json(appointment);
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
    console.error(`GetUser User : Unauthorized access token`);
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

export const getAppointment = async (
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
    const appointment = await findOne({ _id: req.params.id });
    if (!appointment) {
      res.redirect("/");
    } else {
      res.status(200).json(appointment);
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
    console.error(`GetUser User : Unauthorized access token`);
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
