
const jwt = require("jsonwebtoken");
const {sendResponse} = require("../helpers/sendResponse/sendResponse");
const getAccessToRoute = async(req,res,next) => {
    // Is Token Included
    if (!isTokenIncluded(req)){
        return next(sendResponse("You are not authorized to access this page",401));
    }
    
    // Get Token From Header
    
    const accessToken = getAccessTokenFromHeader(req);
    
    // Control If Token Valid

    jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,decodedToken) => {
        
        if (err) {
            return next(sendResponse("You are not authorized to access this page",401));
        }
        req.user = {
            id : decodedToken.id,
            name : decodedToken.name
        };
        next();
    });
    
};