import express from "express";
import {
  fetchTeachers,
  fetchTeacher,
  addTeacher,
  editTeacher,
  removeTeacher,
} from "../controllers/teacherController";

const router = express.Router();

router.get("/teachers", fetchTeachers);
router.get("/teachers/:id", fetchTeacher);
router.post("/teachers", addTeacher);
router.put("/teachers/:id", editTeacher);
router.delete("/teachers/:id", removeTeacher);

export default router;