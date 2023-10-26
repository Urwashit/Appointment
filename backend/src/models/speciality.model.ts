import mongoose, { Schema, Document } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface SpecialityInterface extends Document {
  speciality: string;
  isActive: boolean;
  img: string;
}

// 2. Create a Schema corresponding to the document interface.
const specialitySchema = new Schema<SpecialityInterface>({
  speciality: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  img: { type: String, required: true },
});

// 3. Create a Model.
export const Speciality = mongoose.model<SpecialityInterface>(
  "Speciality",
  specialitySchema
);
