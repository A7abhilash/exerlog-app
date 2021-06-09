const express = require("express");
const Users = require("../models/Users");
const router = express.Router();

//@route     GET /newUser
//@desc       Add new user
router.post("/newUser", async (req, res) => {
  const newUser = req.body;
  // console.log(req.body);
  try {
    let user = await Users.findOne({ googleId: newUser.googleId });
    if (user) {
      return res.json({ msg: "User logged in successfully!!!", user });
    }
    user = await User.create(newUser);
    return res.json({ msg: "New user created successfully!!!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
