const express = require('express');
const router = express.Router();
const {addDevice, getDevices,deleteDevices} = require('../controllers/devices');


router.post("/v1/add", addDevice);
router.get("/v1/get", getDevices);
router.post("/v1/delete", deleteDevices);


module.exports = router;