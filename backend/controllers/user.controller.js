const user = require("../models/user")

async function updateUserById(req, res, next) {

    try {
        const updateByUser = await user.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(201).json(updateByUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

async function getUserById(req, res, next) {

    try {
        const getById = await user.findById(req.params.id)
        res.status(201).json(getById)
    } catch (error) {
        res.status(401).json(error)
    }
}

async function getAll(req, res, next) {

    try {
        const getAllUser = await user.find()
        res.status(201).json(getAllUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

async function deleteUserById(req,res,next){
    try {
        const deleteById = await user.findByIdAndDelete(req.params.id)
        res.status(201).json(deleteById)
        
    } catch (error) {
        res.status(400).send(error)
        
    }
}

module.exports={updateUserById, getUserById, deleteUserById, getAll}