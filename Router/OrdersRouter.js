const express = require("express");
// const { Orders } = require("../Model/OrdersModel");
const { Orders } = require("../Model/Orders");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const OrdersBody = new Orders({
    Name: req.body.Name,
    Email: req.body.Email,
    Course: req.body.Course,
    // description: req.body.description,
    // RegNumber: req.body.RegNumber,
    // UserType: req.body.UserType,
    // School: req.body.School,
    // password: req.body.password,
  });
  const PostedOrdersBody = await OrdersBody.save();
  if (!PostedOrdersBody)
    return res
      .status(400)
      .json({ success: false, message: "Submission was not Successful" });
  res.status(200).json({
    success: true,
    // content: PostedOrdersBody,
    message: "Submission Successful",
  });
});

router.get("/getAllUser", async (req, res) => {
  const User = await Orders.find();

  if (!User) return res.status(400).json({ success: false });
  return res.status(200).json({
    success: true,
    content: User,
  });
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  Orders.find({ Name: req.params.id })
    .then((theOrders) => {
      if (!theOrders) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theOrders);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Orders.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe Orders was not found!`,
        });
      } else {
        res.send({
          message: "Orders was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Orders with id=" + req.params.id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Orders.findByIdAndUpdate(req.params.id, {
    Name: req.body.Name,
    Email: req.body.Email,
    Course: req.body.Course,
  })
    // console.log(req.body.Positions)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot upImage Data with id=${req.params.id}. Maybe Orders was not found!`,
        });
      } else {
        res.send({
          message: "Orders was upImage successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not UpImage Orders with id=" + req.params.id,
      });
    });
});

module.exports = router;
