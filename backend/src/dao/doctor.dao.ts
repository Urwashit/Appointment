import { FilterQuery } from "mongoose";
import { Doctor, DoctorInterface } from "../models/doctor.model";

export const findOne = async (query: FilterQuery<DoctorInterface>) => {
  return await Doctor.findOne(query);
};

export const findAll = async (query: FilterQuery<DoctorInterface>) => {
  return await Doctor.find(query);
};

export const update = async (
  query: FilterQuery<DoctorInterface>,
  update: DoctorInterface
) => {
  return await Doctor.findOneAndUpdate(query, update);
};

export const create = async (update: DoctorInterface) => {
  return await Doctor.create(update);
};
