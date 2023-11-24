import express from "express";
import main from "./config/dbConfig.js";
import taskRouter from "./routes/taskRoutes.js";
import cors from "cors";
import registerRouter from "./routes/resgitserRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/task", taskRouter);
app.use("/api", registerRouter);

main();
app.listen(4000, () => {
  console.log("live");
});
