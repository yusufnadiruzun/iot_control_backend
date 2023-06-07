const express = require("express")
const {authcontrol,register,emailcontrol} = require("../controllers/auth")

const router = express.Router()

router.post("/v1/login",authcontrol);
router.post("/v1/loginMail",emailcontrol);
router.post("/v1/register",register);


module.exports = router;