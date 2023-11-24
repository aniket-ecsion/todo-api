import mongoose from "mongoose";
const { Schema } = mongoose;

const task = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registers",
  },
  task: {
    type: String,
    required: true,
  },
});

const Tasks = mongoose.model("Tasks", task);

export default Tasks;
