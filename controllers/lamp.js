const addRequest = require("../helpers/databaseOperations/lamp");
const sendResponse = require("../helpers/sendResponse/sendResponse");

const setLamp = async (req, res) => {
    const {usertoken,on} = req.body;
    
    return addRequest(usertoken,on)
        .then((result) => sendResponse(res, "success", 200, result))
        .catch((err) => sendResponse(res, "unsuccess", 400, err));
};

module.exports = {
    setLamp
};