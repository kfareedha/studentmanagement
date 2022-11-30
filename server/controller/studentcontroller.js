import studentModel from "../models/studentModel.js";

// Add new Student
export const addStudent = async (req, res) => {
  console.log(req.body, "JJJJ");
  const registernum = req.body.registernum;
  console.log(registernum, "rrrr");
  const student = await studentModel.findOne({ registernum: registernum });
  console.log(student, "rrrr");
  if (student) {
    return res.status(400).json({ message: "Student already exists" });
  }

  const newStudent = new studentModel(req.body);

  try {
    await newStudent.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updateStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await studentModel.findById(studentId);

    await student.updateOne({ $set: req.body });
    res.status(200).json("Post Updated");
  } catch (error) {
    res.status(500).json(error);
  }
};
//Delete post
export const deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await studentModel.findById(studentId);

    await student.deleteOne();
    res.status(200).json("Studentdeleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all students
export const getAll = async (req, res) => {
  try {
    const students = await studentModel.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get a student
export const getStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await studentModel.findById(id);

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json("no such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
