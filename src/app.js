const express=require("express")

const app=express()
const User=require("./models/user")

const {validatedata}=require('./utils/validation')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookie=require("cookie-parser")
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")

app.use(express.json())
app.use(cookie())


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)



// app.patch("/user/:userId",async(req,res)=>{
//   const userId=req.params?.userId
//   const data=req.body
//   const ALLOWED_UPDATES=["firstName","lastName","password","age","gender","skills"]
//   const isUpdateAllowed=Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//   )
//      if(!isUpdateAllowed){
//         res.send("Update not allowed")
//     }
//   try{
//      if(data?.skills.length>10){
//         throw new Error("Skills cannot be more than 10")
//      }
   
//      const user= await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after"})
//      res.send(user)
//   }catch(err){
//      res.status(404).send("Update failed"+err.message)
//   }
// })


const connectDB=require("./config/database")
connectDB().then(()=>{
    console.log("DataBase Connected Succesfully")
    app.listen(7777,()=>{
    console.log("Sucessfully Server Listening on port 7777...")
})
}).catch((err)=>{
    console.log("Database is not Connected")
})

