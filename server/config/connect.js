import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log("db not connected");
  });
export default connectDB;
