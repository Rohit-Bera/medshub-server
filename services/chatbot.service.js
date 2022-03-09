const dialogflow = require("dialogflow");
const uuid = require("uuid");
require("dotenv").config;
const fs = require("fs");
const HttpError = require("../middlewares/HttpError");

//text route service
const chatbotPostService = async (userMessage) => {
  try {
    const projectId = "sagebot-eyqf";
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // const GOOGLE_APPLICATION_CREDENTIALS =
    //   "C:/Users/hp/Desktop/medshubsdp/backend/sagebot.json";

    const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

    const CONFIGURATION = {
      credentials: {
        private_key: CREDENTIALS["private_key"],
        client_email: CREDENTIALS["client_email"],
      },
    };

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: userMessage,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    const query = result.queryText;
    console.log(`  Response: ${result.fulfillmentText}`);
    const reply = result.fulfillmentText;
    const intent = result.intent.displayName;
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);

      const error = new HttpError(404, "no intent found");

      return { error };
    }

    const botMessage = { query, reply, intent };
    // const botMessage = result;
    return { botMessage };
  } catch (error) {
    console.log("error : ", error);
    const err = new HttpError(500, "Internal server error");

    return { error: err };
  }
};

const chatbotGetService = async (event) => {
  try {
    const projectId = "sagebot-eyqf";
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // const GOOGLE_APPLICATION_CREDENTIALS =
    //   "C:/Users/hp/Desktop/medshubsdp/backend/sagebot.json";

    const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

    const CONFIGURATION = {
      credentials: {
        private_key: CREDENTIALS["private_key"],
        client_email: CREDENTIALS["client_email"],
      },
    };

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name: event,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    // console.log(`  Query: ${result.queryText}`);
    const query = result.queryText;
    // console.log(`  Response: ${result.fulfillmentText}`);
    const reply = result.fulfillmentText;
    const intent = result.intent.displayName;
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);

      const error = new HttpError(404, "no intent found");

      return { error };
    }

    const botMessage = { query, reply, intent };

    return { botMessage };
  } catch (error) {
    console.log("error : ", error);
    const err = new HttpError(500, "Internal server error");

    return { error: err };
  }
};

module.exports = { chatbotPostService, chatbotGetService };
// Introduce
