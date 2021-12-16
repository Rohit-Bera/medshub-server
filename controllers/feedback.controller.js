const fetch = require("node-fetch");
require("dotenv").config();
const { google } = require("googleapis");
const HttpError = require("../middlewares/HttpError");

const postFeedback = async (request, response, next) => {
  const user = request.user;
  const _id = user._id;
  const username = user.name;
  const useremail = user.email;

  const { feedback } = request.body;

  try {
    //google sheets

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
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
        values: [[_id, username, useremail, feedback]],
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

module.exports = { postFeedback };
