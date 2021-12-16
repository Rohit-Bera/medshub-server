const express = require("express");
const { postFeedback } = require("../controllers/feedback.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/postFeedback", auth, postFeedback);

module.exports = router;
