const express = require("express");
const auth = require("./auth");
const setStatus = require("./lampOperations");
const userDevices = require("./userDevices");
const device = require("./devices");
const router = express.Router();

router.use("/auth",auth);
router.use("/light",setStatus);
router.use("/userDevices",userDevices);
router.use("/device",device);


module.exports = router;
