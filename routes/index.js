const express = require("express");
const auth = require("./auth");
const operations = require("./operations");

const router = express.Router();

router.use("/auth",auth);
router.use("/light",operations);
module.exports = router;
