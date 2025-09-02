const validator=require("validator")

const validatedata=(req)=>{
    const {firstName,lastName,emailId,password,age,gender,skills}=req.body
    if(!firstName || !lastName){
       throw new Error("Enter Name")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Enter Email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter Strong Password")
    }
}
module.exports={validatedata}