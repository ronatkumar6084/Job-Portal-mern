import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        phoneNumber:{
            type:Number,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:8
        },
        role:{
            type:String,
            enum:["Student","Recruiter"],
            required:true
        },
        profile:{
            bio:{type:String},
            skills:[{type:String}],
            resume:{type:String}, // URL to resume file
            resumeOriginalName:{type:String},
            company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
            profilePhoto:{
                type:String,
                default:""
            }
        },
   },{timestamps:true}
);

export const User = mongoose.model("User",userSchema);