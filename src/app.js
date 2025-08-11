const express=require("express")

const app=express()

app.get("/user",(req,res)=>{
    res.send({firstName:"Amarnath",secondName:"Dasi"})
})


app.use("/test",(req,res)=>{
     res.send("Hello Hello Hello")
})





app.listen(3000,()=>{
    console.log("Sucessfully Server Listening on port 3000...")
})