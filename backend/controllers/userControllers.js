const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    
    return res.status(400).json({error:"please Enter all the fields"})
  }
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return res.status(400).json({error:"user already exist"})
    
  }
  
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      tokem:generateToken(user.id)
    });
  } else {
    return res.status(400).json({error:"failed to create the user"})
  }
});


const authUser=asyncHandler(async(req,res)=>{


const {email,password}=req.body;

  const user =await User.findOne({email});

  if(user && await bcrypt.compare(password,user.password)){
    return res.status(200).json({_id:user._id,name:user.name
    ,email:user.email,pic:user.pic,token:generateToken(user._id)});

  }
  else{
    return res.status(400).json({error:'Invalid Email or Password'})
  }
    



})



module.exports = { registerUser,authUser };
