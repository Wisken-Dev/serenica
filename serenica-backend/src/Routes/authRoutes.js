const express = require("express");
const router = express.Router();
const { signup, login, me } = require("../controllers/authController");
const auth = require("../middleware/auth");

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, me);
router.get("/test", (req, res) => {
  res.send("Auth route is working ✅");
});

module.exports = router;
