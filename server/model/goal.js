import mongoose from "mongoose";

const goal = mongoose.Schema({
  uid: String,
  number: { type: Number, default: 0 },
});

const Goal = mongoose.model("Goal", goal);
export default Goal;
