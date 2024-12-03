import { google } from "googleapis";
import * as dotenv from "dotenv";
import moment from "moment";
import _ from "lodash";
import async from "async";
import jwtDecode from "jwt-decode";

dotenv.config();

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  process.env.client_id,
  process.env.client_secret,
  "http://localhost:5000/oauth2callback"
); // Callback URL
var fitness = google.fitness("v1");

import User from "../model/users.js";
import Goal from "../model/goal.js";

var dataSource =
  "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps";

export const getData = async (req, res) => {
  var url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "https://www.googleapis.com/auth/fitness.activity.read"],
  });
  res.redirect(url);
};

export const callBackUrl = async (req, res) => {
  var code = req.query.code;

  oauth2Client.getToken(code, function (err, token) {
    oauth2Client.setCredentials(token);
    res.redirect("/mainPath?token=" + token.id_token);
  });
};

export const mainPath = async (req, res) => {
  if (checkCredentials(oauth2Client)) {
    var Token = req.query.token;
    var data = jwtDecode(Token);
    res.set("data", data.sub);
    googlefit(res);
    res.redirect("http://localhost:3000/dashboard?" + data.sub);
  } else {
    res.redirect("/");
  }
};

export const getGoals = async (req, res) => {
  const id = req.params.id;
  User.findOne({ uid: id })
    .sort({ _id: -1 })
    .exec()
    .then((doc) => {
      doc !== null ? res.json(doc) : res.json(0);
    })
    .catch((err) => console.log(err));
};

export const getGoalData = async (req, res) => {
  Goal.findOne({ uid: req.params.id })
    .sort({ _id: -1 })
    .exec()
    .then((doc) => {
      doc !== null ? res.json(doc) : res.json(0);
    })
    .catch((err) => console.log(err));
};

export const setGoals = async (req, res) => {
  const data = new Goal({
    uid: req.body.uid,
    number: req.body.number,
  });
  console.log(data);
  data.save();
};

function googlefit(res) {
  var Data = { datas: res.get("data") };
  var data = Data.datas;

  var time_now = parseInt(moment().unix() * 1000000000);
  var time_then = parseInt(
    moment().set({ hour: 0, minute: 0, second: 0 }).unix() * 1000000000
  );

  fitness.users.dataSources.datasets.get(
    {
      userId: "me",
      auth: oauth2Client,
      dataSourceId: dataSource,
      datasetId: time_then + "-" + time_now,
    },
    async (err, _fitness) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Fitness data received!");
      var totalSteps = 0;
      async.each(_fitness.data.point, function (item, callback) {
        totalSteps += item.value[0].intVal;
        callback();
      });
      new User({
        uid: data,
        Step: totalSteps,
      }).save();
    }
  );
}

function checkCredentials(client) {
  if (!_.isEmpty(client.credentials)) {
    return true;
  } else {
    return false;
  }
}
