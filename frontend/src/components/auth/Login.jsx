import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
    const [input, setInput]= useState({
        email:"",
        password:"",
        role:""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, user} = useSelector(store=>store.auth)

    const changeEventHandler = async(e)=>{
        setInput({...input, [e.target.name] : e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input,{
                headers:{"Content-Type" : "application/json"},
                withCredentials:true
            })
            if(res.data.success){
              dispatch(setUser(res.data.user));
                navigate("/")
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
     useEffect(()=>{
        if(user){
          navigate("/");
        }
     },[])
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-5xl">
        <form onSubmit={handleSubmit}
           className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

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
          </div>
          {
            loading ? 
      <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :  
            <Button type="submit" className="w-full">Login</Button>
          }
          <span className="text-sm">Don't have an account <Link to="/signup" className="text-blue-700">Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;

