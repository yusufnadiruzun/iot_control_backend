
const {addDeviceDb, getDevicesDb, deleteDevicesDb} = require('../helpers/databaseOperations/userDevices');
const sendResponse = require("../helpers/sendResponse/sendResponse");

const addDevice = async (req, res) => {
    const {usertoken,deviceName,deviceIp,deviceChannel,bridgeId} = req.body;
    if(usertoken != ""){
    addDeviceDb(usertoken,deviceName,deviceIp,deviceChannel,bridgeId).then((result) => sendResponse(res, true, 200, result))
    .catch((err) => sendResponse(res, false, 400, err));
    }else{
        sendResponse(res, false, 400, "usertoken bos olamaz");
    }
};

const getDevices = async (req, res) => {
    const {usertoken} = req.body;
    getDevicesDb(usertoken).then((result) => sendResponse(res, true, 200, result)).catch((err) => sendResponse(res, false, 400, err));

};

const deleteDevices = async (req, res) => {
    const {usertoken,deviceName} = req.body;
    deleteDevicesDb(usertoken,deviceName).then((result) => sendResponse(res, true, 200, result)).catch((err) => sendResponse(res, false, 400, err));
};

module.exports = { addDevice, getDevices, deleteDevices };
