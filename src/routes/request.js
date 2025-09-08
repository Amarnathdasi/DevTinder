const express=require("express")
const requestRouter=express.Router()
const ConnectionRequest=require("../models/connection")
const { userAuth } = require("../middleware/auth")
const User = require("../models/user")


requestRouter.post("/connectionrequest/:status/:toUserId",userAuth,async(req,res)=>{
   try{
      const fromUserId=req.body._id;
      const toUserId=req.params.toUserId
      const status=req.params.status

      const allowedStatus=["ignored","intersested"]
      if(!allowedStatus.includes(status)){
        return res.json({message:"Invalid status type"+status})
      }
      const user=await User.findOne({toUserId})
      if(!user){
         return res.status(401).send({message:"User not Found"})
      }
      const existingConnectionRequest=await connectionRequest.findOne({
         $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
         ]
      })
      if(existingConnectionRequest){
         return res.status(401).send({message:"Connection already exists"})
      }
      const connectionRequest =new ConnectionRequest({
         fromUserId,
         toUserId,
         status
      })
      const data=await connectionRequest.save()

      res.json({
         message:"connection Request Sent Sucessfully",
         data
      })
     
   }catch(err){
      res.status(401).send("Something went wrong"+err.message)
   }
})
 requestRouter.post("/request/review/:status/:userid",async(req,res)=>{
    const loggedUser=req.user;
   const {status,requestId}=req.params
   const allowedStatus=["accepted","rejected"]
   if(!allowedStatus.includes(status)){
      return res.status(401).json({message:"Status not allowed"})
   }
   const connectionRequest=await ConnectionRequest.findOne({
      toUserId:loggedUser._id,
      fromUserId:requestId,
      status:"interested"
   })
   if(!connectionRequest){
      res.status(401).json({message:"Connection request not found"})
   }
   connectionRequest.status=status
   const data = await connectionRequest.save()
   res.json({message:"Connection request"+data})
 })

module.exports=requestRouter