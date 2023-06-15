
const {addDeviceUserDb, getUserDevicesDb, deleteUserDeviceDb} = require('../helpers/databaseOperations/userDevices');
const sendResponse = require("../helpers/sendResponse/sendResponse");

const addDeviceUser = async (req, res) => {
    const {usertoken,deviceName} = req.body;
    if(usertoken != ""){
    addDeviceUserDb(usertoken,deviceName).then((result) => sendResponse(res, "success", 200, result))
    .catch((err) => sendResponse(res, "unsuccess", 400, err));
    }else{
        sendResponse(res, "unsuccess", 400, "usertoken bos olamaz");
    }
};

const getUserDevices = async (req, res) => {
    const {usertoken} = req.body;
    getUserDevicesDb(usertoken).then((result) => sendResponse(res, "success", 200, result)).catch((err) => sendResponse(res, "unsuccess", 400, err));

};

const deleteUserDevices = async (req, res) => {
    const {usertoken,deviceName} = req.body;
    deleteUserDeviceDb(usertoken,deviceName).then((result) => sendResponse(res, "success", 200, result)).catch((err) => sendResponse(res, "unsuccess", 400, err));
};

module.exports = { addDeviceUser, getUserDevices, deleteUserDevices };
