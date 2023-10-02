import { FilterQuery } from "mongoose";
import { User, UserInterface } from "../models/user.model";

export const findOne = async (query: FilterQuery<UserInterface>) => {
  return await User.findOne(query);
};

export const findAll = async (query: FilterQuery<UserInterface>) => {
  return await User.find(query);
};

export const update = async (
  query: FilterQuery<UserInterface>,
  update: UserInterface
) => {
  return await User.findOneAndUpdate(query, update);
};

export const create = async (update: object) => {
  return await User.create(update);
};
