const express=require("express")
const { userAuth } = require("../middleware/auth")
const userRouter=express.Router()

userRouter.get("/user/received/request",userAuth,async(req,res)=>{
     try{
        const loggedInUser=req.user
        
     }catch(err){
        res.status(404).json({message:"Something went wrong"+err.message})
     }
})



module.exports=userRouter