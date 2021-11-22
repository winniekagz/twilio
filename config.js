"use strict"
require ("dotenv-safe").config()
const cfg={}

cfg.port=process.env.port ||4000

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || "pretty cat";

cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.TwilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
cfg.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
cfg.mongoUrl = process.env.MONGOLAB_URL || process.env.MONGO_URL;

module.exports=cfg