import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup= async(req, res) =>{
    try {
        const {fullName, email, phoneNumber, password, role} = req.body;
        console.log(fullName, email, phoneNumber, password, role);
        
        if(!fullName || !email || !phoneNumber || !password || !role){
            return res.status(500).json({
                message:"All field are required",
                success:false,
            });
        };

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exist",
                success:false,
            });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        });

        return res.status(200).json({
            message:"Account created successfully",
            success:true
        })

    } catch (error) {
        console.log("Error in signin controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async(req, res)=>{
    try {
        const {email,password, role}= req.body;
        console.log(email, password, role);
          
          if(!email || !password || !role){
            return res.status(400).json({
                message:"Please fill all the fields", 
                 success:false});
          };

         let user = await User.findOne({email});
         const isPasswordCorrect = await bcrypt.compare(password, user?.password);
         
         if(!user || !isPasswordCorrect){
            return res.status(400).json({ 
             message: "Invalid email or password",
             success:false });
         };

         // check role is correct or not
         if(role !== user?.role){
            return res.status(400).json({
                message:"Account doesn't match with current role",
                success:false
            });
         };

         const tokendata={
            userId:user._id
         }

         const token = await jwt.sign(tokendata, process.env.JWT_SECRET,{expiresIn:'1d'});

         user={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
         }

         return res.status(200).cookie("token", token,{maxAge:10*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${user?.fullName}`, user,
            success:true
         })

    } catch (error) {
        console.log("Error in login controller ", error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}

export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"LoggedOut Successfully",
            success:true
        })
    } catch (error) {
        console.log("Error in logout controller ", error.message);
        res.status(500).josn({error:"Internal Server error"});
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
         const userId = req.id;
         let user = await User.findById(userId);

         if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            });
         };

         if(fullName)user.fullName = fullName
         if(email)user.email = email
         if(phoneNumber)user.phoneNumber = phoneNumber
         if(bio)user.profile.bio = bio
         if(skills)user.profile.skills = skillsArray

         await user.save();

         user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updates successfully", user,
            success:true
        })
    } catch (error) {
        console.log("Error in updateProfile controller ", error.message);
        res.status(500).josn({error:"Internal Server error"});
    }
}