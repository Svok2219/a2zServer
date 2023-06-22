const mongoose = require("mongoose");
const OrdersModel = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Course: { type: String, required: true },
  // LinkedIN: { type: String, required: true },
});
exports.Orders = mongoose.model("Orders", OrdersModel);
