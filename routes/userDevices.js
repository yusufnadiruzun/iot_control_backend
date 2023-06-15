const express = require('express');
const router = express.Router();
const {addDeviceUser,getUserDevices,deleteUserDevices} = require('../controllers/userDevices');


router.post("/v1/add", addDeviceUser);
router.post("/v1/get", getUserDevices);
router.post("/v1/delete", deleteUserDevices);


module.exports = router;