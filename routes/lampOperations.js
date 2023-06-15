const express = require("express");
const router = express.Router();

const { getAccessToRoute } = require("../middleware/jwt");
const {setLamp} = require("../controllers/lamp");

router.post("/v1/set", getAccessToRoute, setLamp);

module.exports = router