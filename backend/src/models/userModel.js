const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);


//saving the hashed password
userSchema.pre('save',async function(next){
  const user=this 
  if(!user.isModified)
  {
    next() 
  }
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt)
})

//method to compare the passwords
userSchema.methods.matchPassword=async  function(password){
  return await bcrypt.compare(password,this.password)
}




const User = mongoose.model("User", userSchema);
module.exports = User;