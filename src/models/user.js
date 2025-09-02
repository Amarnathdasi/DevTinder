const mongoose=require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:25,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Inavlid Email")
           }
        }
    },
    password:{
         type:String,
         required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password")
            }
         }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("Invalid Gender");
                
                
            }
        },
        default:"male",
    
    },
    skills:{
        type:[String]
    },
},{timestamps:true})


userSchema.methods.getJwt=async function(){
    const user=this
    const token= await jwt.sign({_id:user._id},"DivTinder@1$3",{expiresIn:"7d"})
    return token
}
userSchema.methods.validatePassword=async function(passwordFromUser){
  const user=this
  const passwordHash=user.password
  const isValidPassword=await bcrypt.compare(passwordFromUser,passwordHash)
  return isValidPassword

}

const User=mongoose.model("User",userSchema)
module.exports=User