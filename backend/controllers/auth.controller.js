
const userSchema = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


 async function createUser(req,res){
    const {email, password, userName}= req.body
    const findEmail = await userSchema.findOne({email: req.body.email})
    if(findEmail) return res.status(500).send("Email is already registered")

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password,salt)


  try {
        const newUser = new userSchema({
            email: email,
            password:hash,
            userName:userName,
           
        })
        const finalUser = await newUser.save()
        res.status(201).json({finalUser})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

async function loginUser(req,res){
    try {
        const loginEmail = await userSchema.findOne({email: req.body.email})
        if(!loginEmail) return res.status(500).send("This email is not registered")
    
        const loginPassword = await bcrypt.compare(req.body.password, loginEmail.password)
        if(!loginPassword) return res.status(500).send("Your password is not right")
         const age = 1000* 60 * 24 * 3
        const token= jwt.sign({id: loginEmail._id, }, process.env.SECRET, {expiresIn:age})
       
    
        res.cookie("access_token", token,{
            httpOnly: true,
            maxAge: age
        }).status(200).json({message:"Login successfull",  token})
        
    } catch (error) {
        res.status(400).json(error)
    }
   

}

async function resetPassword(req,res){
    const { email, newPassword, oldPassword } = req.body;
    try {
      const user = await userSchema.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
      await user.save();
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error resetting password', error });
    }
  };

 const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout successfull"})
  };

module.exports ={createUser, loginUser, logout, resetPassword}