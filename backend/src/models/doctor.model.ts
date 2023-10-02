import mongoose, { Schema, Document, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface DoctorInterface extends Document {
  docName: string;
  userId: Types.ObjectId;
  appointmentSlotTime: string;
  dayStartTime: string;
  dayEndTime: string;
}

// 2. Create a Schema corresponding to the document interface.
const doctorSchema = new Schema<DoctorInterface>({
  docName: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  appointmentSlotTime: { type: String, required: true },
  dayStartTime: { type: String, required: true },
  dayEndTime: { type: String, required: true },
});

// 3. Create a Model.
export const Doctor = mongoose.model<DoctorInterface>("Doctor", doctorSchema);
