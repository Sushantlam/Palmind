
const express = require("express")
const router = express.Router()
const {createUser, loginUser, logout}= require("../controllers/auth.controller")
const { updateUserById, getUserById, deleteUserById, getAll } = require("../controllers/user.controller")

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/logout", logout)
router.patch("/update/:id", updateUserById)
router.get("/user/:id", getUserById)
router.get("/all", getAll)
router.delete("/delete/:id", deleteUserById)


module.exports= router
