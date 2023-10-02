import mongoose, { Schema, Document } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 3. Create a Model.
export const User = mongoose.model<UserInterface>("User", userSchema);
