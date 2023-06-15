const jwt = require("jsonwebtoken");
const sendResponse  = require("../helpers/sendResponse/sendResponse");

const getAccessToRoute = async (req, res, next) => {
  // Is Token Included
  
  if (!isTokenIncluded(req)) {
    return next(
      sendResponse(res,"unsuccess",401,"You are not authorized to access this page")
    );
  }
  // Get Token From Header
  debugger;
  const jwtToken = getJwtTokenFromHeader(req);
  // Control If Token Valid
    
  jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
    
      return next(
        sendResponse(res,"unsuccess",401,"You are not authorized to access this page")
      );
    }
    req.user = {
      id: decodedToken.id,
      name: decodedToken.name,
    };
    next();
  });
};

const getJwtTokenFromHeader = (req) => {
  const  header= req.headers.authorization;
  const accessToken = header.toString().split(" ")[1];
  
  return accessToken;
};

const isTokenIncluded = (req) => {
  
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  );
};

module.exports = {
  getAccessToRoute,
};
