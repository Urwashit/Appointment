import { FilterQuery } from "mongoose";
import { Appointment, AppointmentInterface } from "../models/appointment.model";

export const findOne = async (query: FilterQuery<AppointmentInterface>) => {
  return await Appointment.findOne(query);
};

export const findAll = async (query: FilterQuery<AppointmentInterface>) => {
  return await Appointment.find(query);
};

export const update = async (
  query: FilterQuery<AppointmentInterface>,
  update: AppointmentInterface
) => {
  return await Appointment.findOneAndUpdate(query, update);
};

export const create = async (update: AppointmentInterface) => {
  console.log(update);
  return await Appointment.create(update);
};
