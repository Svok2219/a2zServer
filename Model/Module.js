const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const ModuleModel = mongoose.Schema({
  Course: { type: ObjectId, required: true, ref: "Course" },
  ModuleName: { type: String, required: true },
  ModuleNumber: { type: Number, required: true },
  VideoUrl: { type: String, required: false },
  TextLecture: { type: String, required: false },
  Instructor: { type: String, required: true },
  ReachPoint: { type: Number, required: false, default: 0 },
});
exports.Module = mongoose.model("Module", ModuleModel);
