
const {generateJwsFromUser} = require("../../controllers/jwtmethods")

const sendJwtToClient = (user,userToken, res) => {

    const {JWT_EXPIRE, NODE_ENV} = process.env;
        const token = generateJwsFromUser(user);
    return res
    .status(200)
    .cookie("token",token, {
        httpOnly : true,
        expires : new Date(Date.now() +  parseInt(JWT_EXPIRE) * 1000 * 60),
        secure : NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        access_token: token,
        userToken: userToken,
        })
}


module.exports = sendJwtToClient;