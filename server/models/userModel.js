import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    subject: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", UserSchema);
export default userModel;
