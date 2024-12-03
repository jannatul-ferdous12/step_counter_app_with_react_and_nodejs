import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import route from "./router/route.js";

const app = express();

const PORT = 5000;
const url = "mongodb://localhost:27017/test";
const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use("/", route);

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("db connected"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
