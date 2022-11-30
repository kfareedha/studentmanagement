import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    registernum: {
      type: String,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const StudentModel = mongoose.model("Students", studentSchema);
export default StudentModel;
