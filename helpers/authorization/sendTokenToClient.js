const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateJwsFromUser = (name) => {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  let payload = {
    id: 1,
    name: name,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

  return token;
};

const generateUserToken = (name, password) => {
  return bcrypt.hashSync(name + password, 10);
};

const sendTokenToClient = (name, surname, userToken, res) => {
  const { JWT_EXPIRE, NODE_ENV } = process.env;
  const jwtToken = generateJwsFromUser(name);
  return res.status(200).header("Authorization", `Bearer ${jwtToken}`).json({
    status: "success",
    name: name,
    surname: surname,
    userToken: userToken,
  });
};
module.exports = {
  sendTokenToClient,
  generateUserToken,
};
