
const express = require("express")
const app = express()
// const PORT = 8000

const {connectMongo}= require("./connect.js")
const user= require("./routes/user.js")
const dotenv = require("dotenv")
const cors= require("cors")
dotenv.config()



app.use(cors())
app.use(express.json())

connectMongo(process.env.URL).then(()=>{
        console.log(`mongo connected ${process.env.URL}`)
        app.listen(process.env.PORT, (error)=>{
                if(error) console.log(error);
                console.log(`listening at port ${process.env.PORT}`)
        })
}).catch((error)=>{
        console.log(error);

})

app.use("/auth", user)

app.get("/",(req,res)=>{
        res.send("Hello from server")
    })


// app.listen(PORT,()=>{
//         console.log(`listening at port ${PORT}`)
//      })
