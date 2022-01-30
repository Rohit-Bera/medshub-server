const express = require("express");
const {
  postWebFeedback,
  postProductFeedback,
  postMedicineFeedback,
  postOrderProblem,
} = require("../controllers/feedback.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/postWebFeedback", auth, postWebFeedback);

router.post("/postProductFeedback", auth, postProductFeedback);

router.post("/postMedicineFeedback", auth, postMedicineFeedback);

router.post("/postOrderProblem", auth, postOrderProblem);

module.exports = router;
