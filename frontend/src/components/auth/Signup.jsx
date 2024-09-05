import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
    const [input, setInput] = useState({
        fullName:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store=> store.auth)

    const changeEventHandler =(e)=>{
        setInput({...input, [e.target.name] : e.target.value})
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
            const formData = new FormData();
            formData.append("fullName", input.fullName);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("role", input.role);
            if(input.file){
                formData.append("file",input.file);
            }
            try {
              dispatch(setLoading(true));
                const res = await axios.post(`${USER_API_END_POINT}/signup`, formData,{
                    headers:{"Content-Type" : "multipart/form-data"},
                    withCredentials:true
                })
                if(res.data.success){
                    navigate("/login")
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            } finally {
              dispatch(setLoading(false));
            }
        console.log(input);
      }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5 text-center">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input 
              type="text" 
              placeholder="Enter Fullname"
              name="fullName" 
              value={input.fullName}
              onChange={changeEventHandler}
              className="mt-2" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="kumar43@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="mt-2"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input 
              type="number" 
              placeholder="9999888800"
              name="phoneNumber" 
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="mt-2" 
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="mt-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-2 my-2">
              <div className="flex items-center space-x-2">
              <Input 
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"   
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"   
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
                <Label>ProfilePic</Label>
                <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHandler}
                    className="cursor-pointer"
                />
            </div>
          </div>
          {
            loading ? 
      <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :  
            <Button type="submit" className="w-full">SignUp</Button>
          }
         
          <span className="text-sm">Already have an account <Link to="/login" className="text-blue-700">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
