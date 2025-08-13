const express=require("express")

const app=express()

// app.get("/user",(req,res)=>{
//     res.send({firstName:"Amarnath",secondName:"Dasi"})
// })


// app.use("/test",(req,res)=>{
//      res.send("Hello Hello Hello")
// })

app.use("/user",(req,res,next)=>{
    console.log("Route 1")
    next()
    res.send("Route 1")
    
},(req,res)=>{
   res.send("Hi User")
 console.log("Route 2")

})



app.listen(7777,()=>{
    console.log("Sucessfully Server Listening on port 3000...")
})