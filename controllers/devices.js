
const {addDeviceDb, getDevicesDb, deleteDevicesDb} = require('../helpers/databaseOperations/devices/devices');
const sendResponse = require("../helpers/sendResponse/sendResponse");

const addDevice = async (req, res) => {
    const {deviceName, deviceIp, deviceChannel, bridgeId} = req.body;
    addDeviceDb(deviceName, deviceIp, deviceChannel, bridgeId).then((result) => sendResponse(res, "success", 200, "result")).catch((err) => sendResponse(res, "unsuccess", 400, err));
};

const getDevices = async (req, res) => {
    getDevicesDb().then((result) => sendResponse(res, "success", 200, result)).catch((err) => sendResponse(res, "unsuccess", 400, err));

};

const deleteDevices = async (req, res) => {
    const {deviceName} = req.body;
    deleteDevicesDb(deviceName).then((result) => sendResponse(res, "success", 200, result)).catch((err) => sendResponse(res, "unsuccess", 400, err));
};

module.exports = { addDevice, getDevices, deleteDevices };