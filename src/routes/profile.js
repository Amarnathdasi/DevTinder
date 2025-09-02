
const express=require("express")
const profileRouter=express.Router()
const {userAuth}=require("../middleware/auth")


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
   try{
    const user=req.user
     console.log(user)
     res.send(user)
   }catch(err){
        res.status(400).send("Error Saving the user:"+ err.message)
     }
      
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
   
    try{

    }catch(err){
        
    }
})

module.exports=profileRouter