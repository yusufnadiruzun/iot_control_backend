const express = require("express")
const {login,signup} = require("../controllers/auth")

const router = express.Router()

router.post("/v1/login",login);
router.post("/v1/signup",signup);


module.exports = router;