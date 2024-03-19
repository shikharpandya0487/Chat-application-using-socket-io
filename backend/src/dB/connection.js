const mongoose=require('mongoose')
require('dotenv').config()

const connectDb=async ()=>{
    try {
        const status=await mongoose.connect(process.env.MONGO_URL)
        if(status)
            {
                console.log("DB Connected successfully")
            }
    } catch (error) {
        console.log("error connecting to database ",error);
    } 
}

module.exports=connectDb