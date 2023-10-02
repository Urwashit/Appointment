import mongoose, { Schema, Document, Types, Date } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface AppointmentInterface extends Document {
  appointmentDate: Date;
  appointmentTime: string;
  doctorId: Types.ObjectId;
  patientName: string;
  patientEmail: string;
  patientPhone: number;
  appointmentStatus: string;
}

// 2. Create a Schema corresponding to the document interface.
const appointmentSchema = new Schema<AppointmentInterface>({
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor" },
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: Number, required: true },
  appointmentStatus: { type: String, required: true },
});

// 3. Create a Model.
export const Appointment = mongoose.model<AppointmentInterface>(
  "Appointment",
  appointmentSchema
);
