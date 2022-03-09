const dialogflow = require("dialogflow");
const uuid = require("uuid");
require("dotenv").config;
const fs = require("fs");
const service = require("../services/chatbot.service");

//text query
const postChatbot = async (request, response, next) => {
  const { userMessage } = request.body;
  console.log("userMessage: ", userMessage);

  const send = await service.chatbotPostService(userMessage);

  const { botMessage, error } = send;
  console.log("botMessage: ", botMessage);

  if (error) {
    response.json(error);
    next(error);
  }
  const { query, reply, intent } = botMessage;

  response.json({ status: "200", query, reply, intent });
};

//event query
const getChatbot = async (request, response, next) => {
  const event = request.params.event;
  console.log("event: ", event);

  const send = await service.chatbotGetService(event);

  const { botMessage, error } = send;
  console.log("botMessage: ", botMessage);

  if (error) {
    response.json(error);
    next(error);
  }
  const { query, reply, intent } = botMessage;

  response.json({ status: "200", query, reply, intent });
};

module.exports = { postChatbot, getChatbot };
