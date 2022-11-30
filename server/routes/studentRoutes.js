import express from "express";
import {
  addStudent,
  updateStudent,
  deleteStudent,
  getAll,
  getStudent,
} from "../controller/studentcontroller.js";

const router = express.Router();
router.post("/add", addStudent);
router.get("/view", getAll);
router.get("/:id", getStudent);

router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
