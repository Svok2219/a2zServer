const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const ProgressModel = mongoose.Schema({
  UserEmail: { type: String, required: true },
  Progress: { type: Number, required: false, default: 0 },
  CourseID: { type: ObjectId, required: true, ref: "Course" },
});
exports.Progress = mongoose.model("Progress", ProgressModel);
