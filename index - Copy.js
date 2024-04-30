const http = require('http');
const axios = require("axios");
const https = require("https");
const btoa = require("btoa");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");
const { exit } = require("process");
const { escape } = require('html-escaper');
const url = require("url");

const api_key = "8cc51d6e637d5af9";
const secret_key = "Y2QxNWY2MDA2ZjhlYjBlYjA3OTdhNWFmZmQ5Yzc0OTc5YjBkODY4YzVjMzI4MmFjNzVjMjFkYTdkNjkzY2UyOQ==";
const content_type = "application/json";
const source_addr = "INFO";
const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyDQOy77fE7exZyz1PaZb20RQAq8Z9SttTQ",
  authDomain: "maishahouse24.firebaseapp.com",
  projectId: "maishahouse24",
  storageBucket: "maishahouse24.appspot.com",
  messagingSenderId: "1022475935346",
  appId: "1:1022475935346:web:c0a7b078111fd4fc786ceb",
  measurementId: "G-FRYTCYJNGE",
};

function fetchRoomDetails(selectedValue) {
  const dateRef = ref(getDatabase(initializeApp(firebaseConfig)), `Rooms/${selectedValue}`);
  onValue(dateRef, (snapshot) => {
    const room = snapshot.val();
    const emoji = String.fromCodePoint(0x1F680);
    if (room ) {//node index.js
    //UTILITY BILLS
          const mess = `MAISHA 24 HOUSE\n_________________\n>>>ROOM: ${room.roomNumber}\n\nNOVEMBER UTILITY BILL\nWater: 10,300/-\nTrash: 3,000/-\nTotal: 13,300/-\n........................................\nYour Room Bill Status: ${(room.bill)}\nBill Collector: Edgar Mkude (+255654596314)\n........................................\nBy @2.0kiwy\n`;
          //const mess = `MAISHA 24 HOUSE\n_________________\n>>>ROOM: ${room.roomNumber}\n\nNOVEMBER UTILITY BILL\nWater: 10,300/-\nTrash: 3,000/-\nTotal: 13,300/-\n........................................\nYour Room Bill Status: ${(room.bill)}\nBill Collector: Edgar Mkude\nRemaining Paid Unit: ${(room.paidUnit.toFixed(1) - (room.currentUnit.toFixed(1) - room.startUnit.toFixed(1))).toFixed(1)} KwH\n........................................\nBy @2.0kiwy\n`;
    //ELETRICITY BILLS     
          //const mess = `MAISHA 24 HOUSE\n_________________\n>>>ROOM: ${room.roomNumber}\nStart Unit: ${room.startUnit} KwH\nPaid Unit: ${room.paidUnit} KwH\nCurrent Unit: ${room.currentUnit} Kwh\n........................................\nRemaining Paid Unit: ${(room.paidUnit.toFixed(1) - (room.currentUnit.toFixed(1) - room.startUnit.toFixed(1))).toFixed(1)} KwH\nLast Update: ${room.date}\n........................................\nBy @2.0kiwy\n`;
    //PLEASE VISIT
          //const mess = `MAISHA 24 HOUSE\n_________________\n>>>ROOM: ${room.roomNumber}\n Please Visit\nhttps://maishahouse24.web.app/ \n`;
    //WARNING ROOM
          //const mess = `WARNING TO ROOM ${room.roomNumber}\nPlease Visit\nhttps://maishahouse24.web.app/ \n`;
          //const mess = `+255654596314\nTigoPesa\nEdgar Mkude`;
    //const mess = `MAISHA 24 HOUSE\n_________________\n>>>ROOM: ${room.roomNumber}\n\nBill Status: ${(room.bill)}\n        Amount: ${(room.billAmount)}/-\n\nBill Deadline: 19th DEC, Tuesday \nRemaining Paid Unit: ${(room.paidUnit.toFixed(1) - (room.currentUnit.toFixed(1) - room.startUnit.toFixed(1))).toFixed(1)} KwH\n........................................\nBy @2.0kiwy\n`;

    //const mess = `MAISHA 24 HOUSE\n_________________\n>>>ROOM: ${room.roomNumber}\nStart Unit: ${room.startUnit} KwH\nPaid Unit: ${room.paidUnit} KwH\nCurrent Unit: ${room.currentUnit} Kwh\n........................................\nRemaining Paid Unit: ${(room.paidUnit.toFixed(1) - (room.currentUnit.toFixed(1) - room.startUnit.toFixed(1))).toFixed(1)} KwH\n........................................\nBy @2.0kiwy\n`;

      const sanitizedMessage = mess.replace(/[^\x00-\x7F]/g, ""); // Remove non-ASCII characters
      console.log(mess);
      console.log('SMS Sent to: ' + room.roomNumber +'\n +'+ room.phoneNumber);
      send_sms(room.phoneNumber, mess);
    }
  });
}

function send_sms(phoneNumber, message) {
  axios
    .post(
      "https://apisms.beem.africa/v1/send",
      {
        source_addr: source_addr,
        schedule_time: "",
        encoding: 0,
        message: message,
        recipients: [
          {
            recipient_id: 1,
            dest_addr: `${phoneNumber}`,
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
    )
    .then((response) => console.log(response, api_key + ":" + secret_key))
    .catch((error) => console.error(error.response.data))
    ;
  exit;
}

// Create a server object
const server = http.createServer((req, res) => {
  // Set the response HTTP header with status and content type
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Parse the URL query string   http://localhost:3000?room=118
  const query = url.parse(req.url, true).query;
  const selectedValue = query.room;
  console.log(selectedValue);
 
  fetchRoomDetails(selectedValue);
  // Send a response body
  res.end('SMS Sent to: ' +selectedValue);
});

// Set the server to listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
