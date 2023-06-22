const mongoose = require("mongoose");
const AuthenticateModel = mongoose.Schema({
  password: { type: String, required: true },
  RegNumber: { type: Number, required: false, default: 000000 },
  FName: { type: String, required: true },
  LName: { type: String, required: true },
  UName: { type: String, required: true },
  Email: { type: String, required: true },

  UserType: { type: String, required: true, ref: "UserType" },
  School: { type: String, required: true },

  Badge: { type: String, required: false, default: null },
  Points: { type: Number, required: false, default: 0 },
  Class: { type: Number, required: false, default: null },
});
exports.Authenticate = mongoose.model("Authenticate", AuthenticateModel);
