const express = require('express');
const router = express.Router();
const {addDevice, getDevices,deleteDevices} = require('../controllers/userDevices');


router.post("/v1/add", addDevice);
router.post("/v1/get", getDevices);
router.post("/v1/delete", deleteDevices);


module.exports = router;