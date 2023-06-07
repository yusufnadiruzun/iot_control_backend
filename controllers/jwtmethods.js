const jwt = require('jsonwebtoken');


const generateJwsFromUser = (name) =>{

    const {JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    let payload = {
        id: 1,
        name : name
}
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRE});
    return token;
}

module.exports = {generateJwsFromUser};