/* const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Recieved\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("I am Kiran Shet");

      default:
        res.end("404 Error");
    }
  });
});

myServer.listen(8000, () => {
  console.log("myServer is up and running");
});
*/

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from Home Page");
});

app.get("/about", (req, res) => {
  return res.send("Hello from About page");
});

app.listen(8000, () => {
  console.log("Server up and running");
});
