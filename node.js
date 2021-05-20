const process = require("process");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const memory = process.memoryUsage();
console.log("heaptotal : ", memory.heapTotal);
console.log("heapUsed : ", memory.heapUsed);

var osu = require("node-os-utils");

var mem = osu.mem;

mem.info().then((info) => {
  console.log("info : ", info);
});

let storageInfoObj;

var diskspace = require("diskspace");
diskspace.check("C", (err, result) => {
  if (err) console.error("error occurred while reading the memeory", err);
  else
    storageInfoObj = {
      total: Math.floor(result.total / 1e9), // converting bytes to GB
      used: Math.floor(result.used / 1e9),
      left: Math.floor(result.free / 1e9),
    };

  console.log("storageInfoObj", storageInfoObj);
});

app.get("/getStorage", (req, res) => {
  res.json(storageInfoObj);
});

app.get("*", (req, res) => {
  res.send('<h2 style="color:red">No route available</h2>');
});

app.listen(process.env.PORT || 3000);
