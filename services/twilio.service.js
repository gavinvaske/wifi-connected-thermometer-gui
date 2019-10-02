require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// Send a text message using Twilio
function sendText(to, body) {
    client.messages.create({
        body: body,
        to: to,             // Text this number (Example: '+12345678901')
        from: '+12512610293'      // From a valid Twilio number 
    })
    .then((message) => console.log(message.sid));
}


exports.sendText = sendText
