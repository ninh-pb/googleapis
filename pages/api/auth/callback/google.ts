import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(req.query["code"] as string);
  console.log("🚀 ~ tokens:", tokens.access_token)

  oauth2Client.setCredentials(tokens);

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });

  // Example: Reading data from a Google Sheet
  const readResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A1:A2", // Specify the range you want to read
  });

  // Example: Writing data to a Google Sheet
  const writeResponse = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID || "",
    range: "Sheet1!A1:A2", // Specify the range you want to write to
    valueInputOption: "RAW",
    requestBody: {
      values: [["test1"], ["test2"]],
    },
  });

  res.redirect("/");
}
