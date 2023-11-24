import express from "express";
import {
  newTask,
  getTask,
  deleteTask,
  updateTask,
  getById,
} from "../controller/task.js";
const taskRouter = express.Router();

taskRouter
  .get("/:id", getTask)
  .post("/", newTask)
  .delete("/:id", deleteTask)
  .patch("/:id", updateTask)
  .get("/edit/:id", getById);

export default taskRouter;
