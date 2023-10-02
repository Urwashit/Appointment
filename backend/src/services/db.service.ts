import mongoose from "mongoose";
console.log(process.env.DB_URL);

// async checkMongoDbConnection() {
//   await mongoose.connect(process.env.DB_URL).then(() => {
//     $log.info("[AppHealthCheckService]:MongoDB connection successful");
//     mongoose.connection.close();
//   });
// }
mongoose
  .connect(process.env.DB_URL || "")
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
