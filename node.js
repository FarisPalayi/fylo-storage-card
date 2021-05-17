const process = require("process");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const memory = process.memoryUsage();
console.log(memory.heapTotal);
console.log(memory.heapUsed);

var osu = require("node-os-utils");
var drive = osu.drive;

// drive.info()
//   .then(info => {
//     console.log(info);
//   })

//drive.free():Promise(Object)

// drive.info().then(info => console.log(info));

var mem = osu.mem;

mem.info().then((info) => {
  console.log(info);
});

require("child_process").exec("df -h", function (err, resp) {
  console.log(resp);
});

let storageInfoObj;

var diskspace = require("diskspace");
diskspace.check("C", (err, result) => {
  if (err) console.error("error occurred while reading the memeory", err);

  storageInfoObj = {
    total: Math.floor((result.total / 1e9)), // converting bytes to GB
    used:  Math.floor((result.used / 1e9)),
    left:  Math.floor((result.free / 1e9)),
  };
  console.log(storageInfoObj);
});

app.get("/getStorage", (req, res) => {
  res.json(storageInfoObj);
});

app.get("*", (req, res) => {
  res.send('<h1 style="color:red">404 Not Found</h1>');
});

app.listen(process.env.PORT || 3000);
