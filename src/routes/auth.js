const express=require("express")
const authRouter=express.Router()
const bcrypt=require("bcrypt")
const User=require("../models/user")
const {validatedata}=require('../utils/validation')



authRouter.post("/signup",async(req,res)=>{

    try{
     validatedata(req)
     
             const {password}=req.body
            const passwordhash=await bcrypt.hash(password,10)
           
            const {firstName,lastName,age,gender,emailId,skills}=req.body
         const user=new User({
             firstName,
             lastName,
             age,
             gender,
             emailId,
             skills,
             password:passwordhash,
         })
              await user.save()
          res.send("User Added Successfully")
    }catch(err){
        res.status(404).send("Something went wrong"+ err.message)
    }

})

authRouter.post("/login",async(req,res)=>{
   try{
     const {emailId,password}=req.body
     const user=await User.findOne({emailId})
     if(!user){
        throw new Error("Invalid Credentials")
     }
     const isPasswordValid=await user.validatePassword(password)
     if(isPasswordValid){
       const token=await user.getJwt()
        res.cookie("token",token)
        res.send("Successfully Login")
     }else{
        throw new Error("Invalid Credentials")
     }
   }catch(err){
        res.status(400).send("Error Saving the user:"+ err.message)
     }
})
authRouter.post("/logout",async(req,res)=>{
res.cookie("token",null,{
   expires:new Date(Date.now())
})
res.send("Logout Sucessfully")
})
module.exports=authRouter