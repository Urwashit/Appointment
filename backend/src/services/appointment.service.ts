import { Request, Response, NextFunction } from "express";
import { Appointment } from "../models/appointment.model";
import { create, findAll, findOne, update } from "../dao/appointment.dao";
import { getToken, verifyToken } from "./auth.service";

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const appointment = await create(req.body);
  return appointment;
};

export const editAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({ result: "editAppointment" });
};

export const getAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({ result: "getAppointment" });
};

export const getAllAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({ result: "getAllAppointment" });
};
