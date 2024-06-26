const mongoose= require("mongoose")

const user = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    }
})

const userSchema = mongoose.model("user", user)

module.exports = userSchema
