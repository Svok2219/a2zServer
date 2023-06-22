const express = require("express");
// const { Authenticate } = require("../Model/AuthenticateModel");
const { Authenticate } = require("../Model/Authtenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const AuthenticateBody = new Authenticate({
    FName: req.body.FName,
    LName: req.body.LName,
    UName: req.body.UName,
    Email: req.body.Email,
    RegNumber: req.body.RegNumber,
    UserType: req.body.UserType,
    School: req.body.School,
    password: req.body.password,
  });
  const PostedAuthenticateBody = await AuthenticateBody.save();
  if (!PostedAuthenticateBody)
    return res
      .status(400)
      .json({ success: false, message: "Submission was not Successful" });
  res.status(200).json({
    success: true,
    content: PostedAuthenticateBody,
    message: "Submission Successful",
  });
});

router.get("/getAllUser", async (req, res) => {
  const User = await Authenticate.find();

  if (!User) return res.status(400).json({ success: false });
  return res.status(200).json({
    success: true,
    content: User,
  });
});

router.get("/:id", async (req, res) => {
  Authenticate.findById(req.params.id)
    .then((theAuthenticate) => {
      if (!theAuthenticate) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theAuthenticate);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Authenticate.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe Authenticate was not found!`,
        });
      } else {
        res.send({
          message: "Authenticate was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Authenticate with id=" + req.params.id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Authenticate.findByIdAndUpdate(req.params.id, {
    FName: req.body.TFName,
    LName: req.body.LName,
    UName: req.body.UName,
    RegNumber: req.body.RegNumber,
    UserType: req.body.UserType,
    School: req.body.School,
  })
    // console.log(req.body.Positions)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot upImage Data with id=${req.params.id}. Maybe Authenticate was not found!`,
        });
      } else {
        res.send({
          message: "Authenticate was upImage successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not UpImage Authenticate with id=" + req.params.id,
      });
    });
});

module.exports = router;
