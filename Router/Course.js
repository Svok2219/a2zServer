const express = require("express");
// const { Course } = require("../Model/CourseModel");
const { Course } = require("../Model/Course");

const router = express.Router();

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const CourseBody = new Course({
    Title: req.body.Title,
    Image: req.body.Image,
    price: req.body.price,
    description: req.body.description,
    // RegNumber: req.body.RegNumber,
    // UserType: req.body.UserType,
    // School: req.body.School,
    // password: req.body.password,
  });
  const PostedCourseBody = await CourseBody.save();
  if (!PostedCourseBody)
    return res
      .status(400)
      .json({ success: false, message: "Submission was not Successful" });
  res.status(200).json({
    success: true,
    // content: PostedCourseBody,
    message: "Submission Successful",
  });
});

router.get("/getAllUser", async (req, res) => {
  const User = await Course.find();

  if (!User) return res.status(400).json({ success: false });
  return res.status(200).json({
    success: true,
    content: User,
  });
});

router.get("/:id", async (req, res) => {
  Course.findById(req.params.id)
    .then((theCourse) => {
      if (!theCourse) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theCourse);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Course.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe Course was not found!`,
        });
      } else {
        res.send({
          message: "Course was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Course with id=" + req.params.id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Course.findByIdAndUpdate(req.params.id, {
    Title: req.body.Title,
    Image: req.body.Image,
    price: req.body.price,
    description: req.body.description,
  })
    // console.log(req.body.Positions)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot upImage Data with id=${req.params.id}. Maybe Course was not found!`,
        });
      } else {
        res.send({
          message: "Course was upImage successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not UpImage Course with id=" + req.params.id,
      });
    });
});

module.exports = router;
