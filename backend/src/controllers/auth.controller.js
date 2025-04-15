import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import cloudinary  from "../lib/cloudinary.js";
export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;

    try{
        // hash password

        if(password.length < 6){
            return res.status(400).json({message: "password must be at list 6 character"});
        }

        const user = await User.findOne({email})

        if(user) return res.status(400).json({message: "email is already exists"});

        const salt = await bcrypt.genSalt(10)

        const handlePassword = await bcrypt.hash(password,salt);
        const newUser = await User.create({
            email,
            fullName,
            password: handlePassword
        })
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilepic: newUser.profilepic,
            });
            
        }else{
        return res.status(400).json({message: "user is not created"});    
        }  
    }catch(error){
        console.log("error in signup controller",error.message);
        return res.status(500).json({message: "internal server error"});

    }
    
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message: "user not found"});

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "invalid credentials"});
        generateToken(user._id,res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilepic: user.profilepic,
        });
        
    }catch(error){
        console.log("error in login controller",error.message);
        return res.status(500).json({message: "internal server error"});
    }       

   
}

export const logout =(req,res)=>{
   try{
    res.cookie("jwt","",{maxAge: 0});
    res.status(200).json({message: "logout success"});

   }catch(error){
        console.log("error in logout controller",error.message);
        return res.status(500).json({message: "internal server error"});
   }
}
export const updateProfile = async (req, res) => {
    try {
      const { profilePic, profilepic } = req.body;
      const userId = req.user._id;
  
      const imageToUpload = profilePic || profilepic;
      
      if (!imageToUpload) {
        return res.status(400).json({ message: "Profile picture is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(imageToUpload);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilepic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export const checkAuth = async (req, res) => {
    try {
      const token = req.cookies?.jwt;
      if (!token) return res.status(401).json({ message: "Unauthorized: No token" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
  
      if (!user) return res.status(401).json({ message: "Unauthorized: No user found" });
  
      res.status(200).json(user); // ✅ Send back user info
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
};
