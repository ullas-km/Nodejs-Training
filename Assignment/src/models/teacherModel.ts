import pool from "../config/db";

export const getAllTeachers = async () => {
  const [rows] = await pool.query("SELECT * FROM teachers");
  return rows;
};

export const getTeacherById = async (id: number) => {
  const [rows]: any = await pool.query(
    "SELECT * FROM teachers WHERE teacher_id = ?",
    [id]
  );
  return rows[0];
};

export const createTeacher = async (teacher_name: string) => {
  const [result]: any = await pool.query(
    `INSERT INTO teachers (teacher_name, created_at, updated_at)
     VALUES (?, NOW(), NOW())`,
    [teacher_name]
  );

  return result.insertId;
};

export const updateTeacher = async (
  teacher_id: number,
  teacher_name: string
) => {
  const [result]: any = await pool.query(
    `UPDATE teachers 
     SET teacher_name = ?, updated_at = NOW()
     WHERE teacher_id = ?`,
    [teacher_name, teacher_id]
  );

  return result.affectedRows;
};

export const deleteTeacher = async (id: number) => {
  await pool.query(
    "DELETE FROM teacher_subjects WHERE teacher_id = ?",
    [id]
  );

  const [result]: any = await pool.query(
    "DELETE FROM teachers WHERE teacher_id = ?",
    [id]
  );

  return result.affectedRows;
};