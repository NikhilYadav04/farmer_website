const twilio = require("twilio");
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountToken = process.env.TWILIO_ACCOUNT_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = new twilio(accountSid, accountToken);

module.exports = twilioClient;
