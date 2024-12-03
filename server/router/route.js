import express from "express";
import {
  getData,
  callBackUrl,
  mainPath,
  getGoals,
  setGoals,
  getGoalData,
} from "../controller/user-controler.js";

const route = express.Router();

route.get("/", getData);
route.get("/oauth2callback", callBackUrl);
route.get("/mainPath", mainPath);
route.get("/getData/:id", getGoals);
route.get("/getGoal/:id", getGoalData);
route.post("/add", setGoals);

export default route;
