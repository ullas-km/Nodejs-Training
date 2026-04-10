import express from "express";
import type { Request, Response } from "express";
import pool, { connectDB } from "./db";

const app = express();
const PORT = 3000;

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server and MySQL Running successfully");
});

app.get("/myName", (req: Request, res:Response) => {
    console.log('This is a message from myName route');
    res.send('myname successful');
})

app.get("/get-data", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM teachers");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});