const fetch = require("node-fetch");
require("dotenv").config();
const { google } = require("googleapis");
const HttpError = require("../middlewares/HttpError");

const postWebFeedback = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  const name = user.name;
  const phoneNumber = user.phoneNumber;

  const { feedback } = request.body;

  try {
    //google sheets

    const auth = new google.auth.GoogleAuth({
      keyFile: "sheet.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = process.env.SPREADSHEETID;
    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    //get rows from spread sheet

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "feedback!A:D",
    });

    // write rows into sheets
    const added = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "feedback!A:D",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[_id, name, phoneNumber, feedback]],
      },
    });

    const show = added.config.data;

    response.json({ status: "200", show });
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "something went wrong in feedback");

    response.json({ err, error });

    return next(err);
  }
};

const postProductFeedback = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  const name = user.name;
  const phoneNumber = user.phoneNumber;

  const { feedback, productId, productName, productBrand } = request.body;

  try {
    //google sheets

    const auth = new google.auth.GoogleAuth({
      keyFile: "sheet.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = process.env.SPREADSHEETID;
    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    //get rows from spread sheet

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "products!A:G",
    });

    // write rows into sheets
    const added = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "products!A:G",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            _id,
            name,
            phoneNumber,
            productId,
            productName,
            productBrand,
            feedback,
          ],
        ],
      },
    });

    const show = added.config.data;

    response.json({ status: "200", show });
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "something went wrong");

    response.json({ err, error });

    return next(err);
  }
};

const postMedicineFeedback = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  const name = user.name;
  const phoneNumber = user.phoneNumber;

  const { feedback, medicineId, medicineName } = request.body;

  try {
    //google sheets

    const auth = new google.auth.GoogleAuth({
      keyFile: "sheet.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = process.env.SPREADSHEETID;
    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    //get rows from spread sheet

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "medicines!A:F",
    });

    // write rows into sheets
    const added = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "medicines!A:F",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[_id, name, phoneNumber, medicineId, medicineName, feedback]],
      },
    });

    const show = added.config.data;

    response.json({ status: "200", show });
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "something went wrong");

    response.json({ err, error });

    return next(err);
  }
};

// testing
const postOrderProblem = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  const name = user.name;
  const phoneNumber = user.phoneNumber;

  const { orderId, itemName, problem } = request.body;

  try {
    //google sheets

    const auth = new google.auth.GoogleAuth({
      keyFile: "sheet.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = process.env.SPREADSHEETID;
    const metadata = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    //get rows from spread sheet

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "orders!A:F",
    });

    // write rows into sheets
    const added = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "orders!A:F",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[_id, name, phoneNumber, orderId, itemName, problem]],
      },
    });

    const show = added.config.data;

    response.json({ status: "200", show });
  } catch (error) {
    console.log("error: ", error);

    const err = new HttpError(500, "something went wrong");

    response.json({ err, error });

    return next(err);
  }
};

module.exports = {
  postWebFeedback,
  postProductFeedback,
  postMedicineFeedback,
  postOrderProblem,
};
