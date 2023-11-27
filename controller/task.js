import Tasks from "../model/task.js";

export const newTask = async (req, res) => {
  console.log(req.body);
  // process.exit(0);
  const { id, task } = req.body;
  if (!task) {
    return res.json({ message: "Please Enter Task" });
  }
  const newTask = await Tasks.create({
    userId: id,
    task: task,
  });
  const allTask = await Tasks.find({ userId: id });

  return res
    .status(200)
    .json({ massge: newTask, succsess: "true", data: allTask });
};

export const getTask = async (req, res) => {
  const id = req.params.id;
  const allTask = await Tasks.find({ userId: id });
  if (allTask) {
    return res.status(200).json(allTask);
  }
  return res.status(400).json({ massge: "not found" });
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const task = await Tasks.findById(id);
  if (task) {
    await task.deleteOne();
    return res.status(200).json({ massge: "Task Deleted" });
  }
  return res.status(400).json({ massge: "Task not Deleted" });
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const taskOne = await Tasks.findById(id);

  if (!taskOne) {
    return res.status(400).json({ massge: "task not found" });
  }

  const updatedTask = await Tasks.findByIdAndUpdate(
    id,
    { $set: { task: req.body.task } }, // Use $set to update specific fields
    { new: true, runValidators: true } // Return the updated document, and run validation
  );

  const allTask = await Tasks.find({ userId: req.body.id });
  console.log(allTask, "task", req.body);
  return res.status(200).json(allTask);
};

export const getById = async (req, res) => {
  const id = req.params.id;
  const task = await Tasks.findById(id);
  if (!task) {
    return res.status(400).json({ massge: "task not found" });
  }
  return res.status(200).json(task);
};
