const mongoose = require("mongoose");
const CourseModel = mongoose.Schema({
  Title: { type: String, required: true },
  Image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  Duration: { type: String, required: false, default: "4 Hours" },
});
exports.Course = mongoose.model("Course", CourseModel);
