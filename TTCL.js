
const axios = require("axios");
const https = require("https");
var btoa = require("btoa");

const api_key = "8cc51d6e637d5af9";
const secret_key = "Y2QxNWY2MDA2ZjhlYjBlYjA3OTdhNWFmZmQ5Yzc0OTc5YjBkODY4YzVjMzI4MmFjNzVjMjFkYTdkNjkzY2UyOQ==";
const content_type = "application/json";
const source_addr = "INFO";

function send_sms() {
  axios
    .post(
      "https://apisms.beem.africa/v1/send",
      {
        source_addr: source_addr,
        schedule_time: "",
        encoding: 0,
        message: "Sikujua kama umeniblock nimekja kujua leo coz i saw u at chuo i was tryin to call ugeuke",
        recipients: [
          {
            recipient_id: 1,
            dest_addr: "255737205292",
          },
        ],
      },
      {
        headers: {
          "Content-Type": content_type,
          Authorization: "Basic " + btoa(api_key + ":" + secret_key),
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );
}

send_sms();