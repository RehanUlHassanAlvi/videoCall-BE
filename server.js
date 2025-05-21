const express = require('express');
const cors = require('cors');         // Import cors
const { json } = require('body-parser');
const { jwt: { AccessToken } } = require('twilio');
const VideoGrant = AccessToken.VideoGrant;

const app = express();

app.use(cors());                     // Enable CORS for all origins
app.use(json());

app.post('/api/token', (req, res) => {
  const { identity, room } = req.body;

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { identity }
  );

  token.addGrant(new VideoGrant({ room }));

  res.status(200).json({ token: token.toJwt() });
});

module.exports = app;
