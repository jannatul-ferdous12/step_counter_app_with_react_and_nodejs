import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = mongoose.Schema({
  uid: String,
  Step: { type: Number, default: 0 },
  walkdata: { type: String, ref: "Goal" },
});

const User = mongoose.model("user", user);
export default User;
