const express = require("express");
// const { Module } = require("../Model/ModuleModel");
const { Module } = require("../Model/Module");

const router = express.Router();

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const ModuleBody = new Module({
    Course: req.body.Course,
    ModuleName: req.body.ModuleName,
    ModuleNumber: req.body.ModuleNumber,
    VideoUrl: req.body.VideoUrl,
    TextLecture: req.body.TextLecture,
    // RegNumber: req.body.RegNumber,
    // UserType: req.body.UserType,
    // School: req.body.School,
    // password: req.body.password,
  });
  const PostedModuleBody = await ModuleBody.save();
  if (!PostedModuleBody)
    return res
      .status(400)
      .json({ success: false, message: "Submission was not Successful" });
  res.status(200).json({
    success: true,
    // content: PostedModuleBody,
    message: "Submission Successful",
  });
});

router.get("/", async (req, res) => {
  const User = await Module.find().populate("Course");

  if (!User) return res.status(400).json({ success: false });
  return res.status(200).json({
    success: true,
    content: User,
  });
});

router.get("/:id", async (req, res) => {
  Module.find({ Course: req.params.id })
    .then((theModule) => {
      if (!theModule) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theModule);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Module.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe Module was not found!`,
        });
      } else {
        res.send({
          message: "Module was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Module with id=" + req.params.id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Module.findByIdAndUpdate(req.params.id, {
    Course: req.body.Course,

    ModuleName: req.body.ModuleName,
    ModuleNumber: req.body.ModuleNumber,
    VideoUrl: req.body.VideoUrl,
    TextLecture: req.body.TextLecture,
  })
    // console.log(req.body.Positions)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot upModuleNumber Data with id=${req.params.id}. Maybe Module was not found!`,
        });
      } else {
        res.send({
          message: "Module was upModuleNumber successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not UpModuleNumber Module with id=" + req.params.id,
      });
    });
});

module.exports = router;
