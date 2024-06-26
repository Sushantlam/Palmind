
const express = require("express")
const router = express.Router()
const {createUser, loginUser, logout}= require("../controllers/auth.controller")

router.post("/", createUser)
router.post("/login", loginUser)
router.post("/logout", logout)


module.exports= router
