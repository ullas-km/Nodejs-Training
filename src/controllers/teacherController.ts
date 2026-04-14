import { Request, Response } from "express";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../models/teacherModel";

// GET all
export const fetchTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await getAllTeachers();
    res.json(teachers);
  } catch (error) {
    res.status(500).send(`Error fetching teachers ${error}`);
  }
};

// GET by ID
export const fetchTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await getTeacherById(Number(req.params.id));

    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).send(`Error fetching teacher ${error}`);
  }
};

// CREATE
export const addTeacher = async (req: Request, res: Response) => {
  try {
    const { teacher_name } = req.body;

    if (!teacher_name) {
      return res.status(400).send("Teacher name is required");
    }

    const id = await createTeacher(teacher_name);

    res.status(201).json({
      teacher_id: id,
      teacher_name,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).send("Error creating teacher");
  }
};

// UPDATE
export const editTeacher = async (req: Request, res: Response) => {
  try {
    const teacher_id = Number(req.params.id);
    const { teacher_name } = req.body;

    // Validation
    if (Number.isNaN(teacher_id)) {
      return res.status(400).send("Invalid teacher ID");
    }

    if (!teacher_name) {
      return res.status(400).send("Teacher name is required");
    }

    const updated = await updateTeacher(teacher_id, teacher_name);

    if (!updated) {
      return res.status(404).send("Teacher not found");
    }

    res.send("Teacher updated successfully");
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).send("Error updating teacher");
  }
};

// DELETE
export const removeTeacher = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deleted = await deleteTeacher(id);

    if (!deleted) {
      return res.status(404).send("Teacher not found");
    }

    res.send("Teacher deleted successfully");
  } catch (error) {
    console.log(`Error:${error}`)
    res.status(500).send("Error deleting teacher");
  }
};