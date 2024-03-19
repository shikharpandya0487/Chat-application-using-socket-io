//this middleware checks whether the user is logged in or not 
const jwt=require('jsonwebtoken')
const User=require('../models/userModel.js')

const authmiddleware=async (req,res,next)=>{
    try {
        let token 
        if( req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            try {
                token=req.headers.authorization.split(" ")[1];
                const decode=jwt.verify(token,process.env.JWT_SECRET)
                // console.log(decode.id)
                req.user=await User.findById(decode.id).select('-password')
                // console.log(req.user?._id);
                next()
            } catch (error) {
                res.status(400)
                throw new Error("Not authorized ")
            }

        }
        if(!token)
        {
            res.status(400)
            throw new Error("Token not present so not authorized")
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error while authenticating")
    }
}

module.exports=authmiddleware