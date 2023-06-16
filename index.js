import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";

import viewsRouter from "./routes/views.js";
import userRouter from "./routes/user.js"

const PORT = 8080;
const mongoUri = process.env.MONGODB_URI || "";

const app = express();

mongoose
  .connect(mongoUri)
  .then(() => console.log("DB has been connected..."))
  .catch((err) => console.log(err));

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", viewsRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
