const express = require("express");
const { Authenticate } = require("../Model/Authtenticate");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const token = `${
    req.body.Email
  }${Math.random().toString()}${Date.now().toString()}`;
  const PostedValidationBody = await Authenticate.find({
    Email: req.body.Email,
    password: req.body.password,
  });
  //   console.log(PostedValidationBody.length);
  if (PostedValidationBody.length === 0 || PostedValidationBody.length > 1) {
    res.status(400).json({ success: false, content: PostedValidationBody });
  } else {
    res
      .status(200)
      .json({ success: true, token: token, content: PostedValidationBody });
  }

  //   console.log(PostedValidationBody);
  //   if (!PostedValidationBody)
});

module.exports = router;
