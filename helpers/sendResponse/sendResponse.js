const sendResponse = (res,success,statusCode, data) => {

   return res.status(statusCode).json({
        status: success,
        data: data
    })
}

module.exports = sendResponse;