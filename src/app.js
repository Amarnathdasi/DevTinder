const express=require("express")

const app=express()

// app.get("/user",(req,res)=>{
//     res.send({firstName:"Amarnath",secondName:"Dasi"})
// })


// app.use("/test",(req,res)=>{
//      res.send("Hello Hello Hello")
// })

// app.use("/user",(req,res,next)=>{
//     console.log("Route 1")
//     next()
//     // res.send("Route 1")
    
// },(req,res,next)=>{
// //    res.send("Hi User")
//  console.log("Route 2")
//  next()

// })

const {adminAuth,userAuth}=require("./middleware/auth.js")
app.use("/admin",adminAuth)
app.get("/admin/getAllData",(req,res)=>{
    
        res.send("send Data")
   
})

app.get("/admin/deleteData",(req,res)=>{
  
    res.send("Data Deleted")
  
})

app.get("/user/login",(req,res)=>{
    res.send("user Login")
})

app.get("/user/getData",userAuth,(req,res)=>{
    res.send("userData Send")
})


app.listen(7777,()=>{
    console.log("Sucessfully Server Listening on port 3000...")
})