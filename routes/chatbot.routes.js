const express = require("express");
const {
  postChatbot,
  getChatbot,
} = require("../controllers/chatbot.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/postChatbot", postChatbot);
router.post("/ChatbotEventQuery/:event", getChatbot);

module.exports = router;
