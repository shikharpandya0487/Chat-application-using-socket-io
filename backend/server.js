const express=require('express')
const app=express()
require('dotenv').config()
const chats=require('./src/dummyData/data.js')
const PORT=process.env.PORT || 5000
const cors=require('cors')
const connectDb = require('./src/dB/connection.js')
app.use(cors())
app.use(express.json()) //to acc json data
const userRoutes=require('./src/routes/userRoutes.js')
const chatRoutes=require('./src/routes/chatRoutes.js')
    
app.get('/',(req,res)=>{
    res.send("APi is running")
}) 
           
app.use('/api/user',userRoutes)
app.use("/api/chat",chatRoutes)    
 
app.listen(PORT,()=>{
    console.log("Server running on the port ",PORT);
}) 


connectDb()

 