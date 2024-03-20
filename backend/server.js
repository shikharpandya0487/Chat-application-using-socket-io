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
const messageRoutes=require('./src/routes/messageRoutes.js')
app.get('/',(req,res)=>{ 
    res.send("APi is running") 
})      
                     
app.use('/api/user',userRoutes)
app.use("/api/chat",chatRoutes)   
app.use("/api/message",messageRoutes) 
 
const server=app.listen(PORT,()=>{  
    console.log("Server running on the port ",PORT);
})  
 
const io=require('socket.io')(
    server,
    {
        pingTimeout:50000,
        cors:{
            origin:`http://localhost:3000`
        }
    }
)

io.on("connection",(socket)=>{
    console.log("Connected to the client (socket.io) ");

    socket.on("setup",(userData)=>{
        socket.join(userData._id)
        console.log("This is the user id ",userData._id);
        socket.emit("connected")
    })

    socket.on("join-chat",(room)=>{
        console.log("User joined the room ",room)
    })

    //event listner for sending the message
    //required things
    //To whom msg is sent 
    //the message which should be sent 
    socket.on("new-msg",(newMsg)=>{
        var chat =newMsg.chat;

        if(!chat.users)
        {
           return console.log("Chat users not defined");
        }

        chat.users.forEach((user)=>{
            if(user._id===newMsg.sender._id)
            {
                return;
            }
            //socket.in means msg sent to all in the room

            socket.in(user._id).emit("Msg-recieved",newMsg)
        })



    })


    // socket for indicating user typing or not typing 
    socket.on("typing",(user)=>socket.in(user).emit("Typing"))

    socket.on("stop typing",(room)=>socket.in(room).emit("Stop typing"))

    socket.off("setup",()=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    })
})
   

connectDb()  

  