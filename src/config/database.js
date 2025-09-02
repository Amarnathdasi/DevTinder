const mongoose=require("mongoose")
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://NamasteNode:FySxcU4h4tJaWN7j@namastenode.utholx.mongodb.net/devTinder")
}
module.exports=connectDB
