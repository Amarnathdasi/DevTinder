const mongoose=require("mongoose")

const connectionSchema=new mongoose.Schema({
    fromUserId:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
    },
    toUserId:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
    },
    status:{
      type:String,
        required:true,
         enum:{
            values:["intersested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
         },
       
    }
},{timestamps:true})


connectionSchema.pre("save",function(next){
   const connection=this
   if(connection.fromUserId.equals(connection.toUserId)){
       throw new Error("Cannot send connection request to yourself")
   }
   next()
})

const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionSchema)
module.exports=ConnectionRequest