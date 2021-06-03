const process = require("process");
const express = require("express");
const app = express();
const cors = require("cors");
const nodeDiskInfo = require('node-disk-info');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let storageInfoObj;

try {
  const disks = nodeDiskInfo.getDiskInfoSync();
  printResults(disks);
} catch (e) {
  console.error(e);
}

function printResults(disks) {
    for (const disk of disks) {
        storageInfoObj = { // converting bytes to GB
          total:`${Math.floor(disk.blocks / 1e9)}`,
          used: `${Math.floor(disk.used / 1e9)}`,
          left: `${Math.floor(disk.available / 1e9)}`,
          percentage: disk.capacity,
        };
    }
}
// =========================================================================================

app.get("/getStorage", (req, res) => { res.json(storageInfoObj) });

app.get("*", (req, res) => { res.send('<h2 style="color:red">No route available</h2>') });

app.listen(process.env.PORT || 3000);