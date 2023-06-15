const express = require("express");
const auth = require("./auth");
const setStatus = require("./lampOperations");
const userDevices = require("./userDevices");
const router = express.Router();

router.use("/auth",auth);
router.use("/light",setStatus);
router.use("/userDevices",userDevices);


module.exports = router;
