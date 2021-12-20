const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const passport = require("passport");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});
router.post("/logout", (req, res) => {
  req.logout();
  res.json("Logged out!");
});
router.post("/register", controller.register);
router.put('/account', controller.updateUserInfo);

module.exports = router;
