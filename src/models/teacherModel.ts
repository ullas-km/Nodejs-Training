import pool from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Teacher extends RowDataPacket {
  teacher_id: number;
  teacher_name: string;
  created_at: Date;
  updated_at: Date;
}

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const [rows] = await pool.query<Teacher[]>("SELECT * FROM teachers");
  return rows;
};

export const getTeacherById = async (id: number): Promise<Teacher | undefined> => {
  const [rows] = await pool.query<Teacher[]>(
    "SELECT * FROM teachers WHERE teacher_id = ?",
    [id]
  );
  return rows[0];
};

export const createTeacher = async (teacher_name: string): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO teachers (teacher_name, created_at, updated_at)
     VALUES (?, NOW(), NOW())`,
    [teacher_name]
  );

  return result.insertId;
};

export const updateTeacher = async (
  teacher_id: number,
  teacher_name: string
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE teachers 
     SET teacher_name = ?, updated_at = NOW()
     WHERE teacher_id = ?`,
    [teacher_name, teacher_id]
  );

  return result.affectedRows;
};

export const deleteTeacher = async (id: number): Promise<number> => {
  await pool.query(
    "DELETE FROM teacher_subjects WHERE teacher_id = ?",
    [id]
  );

  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM teachers WHERE teacher_id = ?",
    [id]
  );

  return result.affectedRows;
};