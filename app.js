//including npm modules

const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");
require('dotenv').config();
var HTTP_PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = process.env.List_ID;
  const options = {
    method: "POST",
    auth: process.env.API_KEY,
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else res.sendFile(__dirname + "/failure.html");

    response.on("data", function (data) {});
  });
  request.write(jsonData);
  request.end();
});

app.post("/faliure", function (req, res) {
  res.redirect("/");
});

app.listen( HTTP_PORT || 3000, function () {
  console.log("server is running on port 3000");
});


