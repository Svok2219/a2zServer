const express = require("express");
// const { Progress } = require("../Model/ProgressModel");
const { Progress } = require("../Model/Progress");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const ProgressBody = new Progress({
    UserEmail: req.body.UserEmail,
    Progress: req.body.Progress,
    CourseID: req.body.CourseID,
    // description: req.body.description,
    // RegNumber: req.body.RegNumber,
    // UserType: req.body.UserType,
    // School: req.body.School,
    // password: req.body.password,
  });
  const PostedProgressBody = await ProgressBody.save();
  if (!PostedProgressBody)
    return res
      .status(400)
      .json({ success: false, message: "Submission was not Successful" });
  res.status(200).json({
    success: true,
    // content: PostedProgressBody,
    message: "Submission Successful",
  });
});

router.get("/", async (req, res) => {
  console.log(req.body);
  const User = await Progress.find().populate("CourseID");

  if (!User) return res.status(400).json({ success: false });
  return res.status(200).json({
    success: true,
    content: User,
  });
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  Progress.find({ UserEmail: req.params.id })
    .populate("CourseID")
    .then((theProgress) => {
      if (!theProgress) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theProgress);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.post("/oneCourse/:id", async (req, res) => {
  console.log(req.params.id, req.body.CourseID);
  Progress.findOne({ CourseID: req.body.CourseID, UserEmail: req.params.id })
    .then((theProgress) => {
      if (!theProgress) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).json({
          success: true,
          message: "Here it is",
          content: theProgress._id,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  // console.log(req.params.id);
  Progress.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe Progress was not found!`,
        });
      } else {
        res.send({
          message: "Progress was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Progress with id=" + req.params.id,
      });
    });
});

router.patch("/:id", (req, res) => {
  console.log(req.body.Progress, req.params.id);

  Progress.findByIdAndUpdate(req.params.id, {
    Progress: req.body.Progress,
  })
    // console.log(req.body.Positions)
    .then((result) => {
      if (!result) {
        console.log(result);
        res.status(404).send({
          success: false,
          message: `Cannot upProgress Data with id=${req.params.id}. Maybe Progress was not found!`,
        });
      } else {
        console.log("Progress was upProgress successfully!");
        res.send({
          success: true,
          message: "Progress was upProgressed successfully!",
          content: result,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "Could not UpProgress Progress with id=" + req.params.id,
      });
    });
});

module.exports = router;
