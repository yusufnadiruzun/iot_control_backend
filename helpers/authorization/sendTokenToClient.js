const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateUserToken = (name, password) => {
  return bcrypt.hashSync(name + password, 10);
};
const generateJwsFromUser = (mail) => {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  let payload = {
    id: 1,
    name: mail,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

  return token;
};

const sendTokenToClient = (mail, name, surname, userToken, res) => {
  const jwtToken = generateJwsFromUser(mail);
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
