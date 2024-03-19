const User=require('../../models/userModel.js')
const generateToken=require('../../dB/generateToken.js')
const registerUser = async (req,res) => {
  try {
    const {email,password,name,pic}=req.body 

    if(!email||!name||!password)
    {   
        res.status(400).json({message:"Fill required data entries"})
        throw new Error("Fill required data entries")
    }

    //check whether the user pre-exists or not
    //create user 
    // set the password 
    //save that password
    // hash the password before saving

    const userExists=await User.findOne({email})
    if(userExists)
    {
        res.status(401).json({
            message:"User already present"
        })
        throw new Error("User exists")
    }

    const user=await User.create({
        email,
        name,
        password,
        pic
    })

    if(user)
    {
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user.id)
        })
    }
    else
    {
        throw new Error("User can't be created")
    }

  } catch (error) {
    console.log("Error while registering the user ",error)
  }
}


const loginUser=async (req,res)=>{
  try{
    const {email,password}=req.body 
    
    const user=await User.findOne({email})

    if(!user)
    {
        res.status(401).json({message:"User not found"})
        throw new Error("User not found")
    }

    if(user && (await user.matchPassword(password)))
    {
        res.json({
            name:user.name,
            _id:user._id,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }    

  } catch (error) {
    
  }
}

// i means case sensitive
const allUsers=async (req,res)=>{
  try {
    const keyword=req.query.search 
    // console.log(keyword);
   ? {
    $or:[
      {name:{$regex:req.query.search,$options:"i"}},
      {email:{$regex:req.query.search,$options:"i"}}
    ],
  }:{}
   //ne not equal to the user logged in
  const user=await User.find(keyword).find({_id:{$ne:req.user._id}})
  console.log(user);
  if(!user)
  {
    throw new Error("Error while getting the user")
  }
  else
  {
    return res.status(200).json(user)
  }
     
  } catch (error) {
    console.log(error);
    throw new Error("error while fetching the chats ")
  }
}
module.exports={loginUser,allUsers,registerUser}
