const User=require("../models/user")
const jwt=require("jsonwebtoken")
const userAuth=async(req,res,next)=>{
 try{
    const {token}=req.cookies
  if(!token){
    throw new Error("Invalid Token")
  }
  const decodeData=await  jwt.verify(token,"DivTinder@1$3")
  const {_id}=decodeData
  const user=await User.findById({_id})
  if(!user){
    throw new Error("User Doesnot exists")
  }
  req.user=user
  next()
}catch(err){
   res.status(404).send("Something went wrong"+err.message)
}
}
module.exports={userAuth}