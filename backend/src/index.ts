import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./controller/user.controller"; // Route connected
import appointmentRoute from "./controller/appointment.controller";
import doctorRoute from "./controller/doctor.controller";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/user", userRoutes); // This means all route path preceed this path
app.use("/appointment", appointmentRoute);
app.use("/doctor", doctorRoute);
// Below route is trigerred when any error is is thrown
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.get("/", (req, res) => {
  console.log(res);
  res.send("Well done!");
});

console.log(process.env.DB_URL);

mongoose
  .connect(process.env.DB_URL || "")
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
