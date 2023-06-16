import express from "express";
import mongoose from "mongoose";
import path from "path";

const PORT = 8080;
const mongoUri =
  "mongodb+srv://Michail:anime12345@cluster0.hy40t.mongodb.net/NewsApp?retryWrites=true&w=majority";

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


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
