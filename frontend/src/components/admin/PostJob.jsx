import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirments: "",
    salary: "",
    exeprience: "",
    location: "",
    jobType: "",
    vacancies: 0,
    companyId: "",
  });
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) =>{
      const selectedCompany = companies.find((company)=>company?.name?.toLowerCase() === value)
      setInput({...input, companyId: selectedCompany._id})
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{'Content-Type' : 'application/json'}, 
        withCredentials:true,
      });
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/jobs")
      }
    } catch (error) {
      console.log(error) 
      toast.error(error.response.data.message);
    } finally {
        setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-5xl mx-auto border border-gray-600 shadow-lg rounded-lg">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirments</Label>
              <Input
                type="text"
                name="requirments"
                value={input.requirments}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="exeprience"
                value={input.exeprience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Vacancies</Label>
              <Input
                type="number"
                name="vacancies"
                value={input.vacancies}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          
            {
              companies.length > 0 && (
             <Select onValueChange={selectChangeHandler}>
             <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Select a company" />
             </SelectTrigger>
             <SelectContent>
               <SelectGroup>
                {
                  companies.map((company)=>{
                    return (
                      <SelectItem value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                    )
                  })
                }
               </SelectGroup>
             </SelectContent>
           </Select>
            )
          }                       
          </div>
          <div className="flex items-center justify-between">
          <Button variant="outline" onClick={()=> navigate("/admin/jobs")}>Cancel</Button>
          {
  loading ? <Button className="my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <Button type="submit" className="my-4">Post New Job</Button>
          }
          </div>
         
          {
          companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )
          }
        </form>
      </div>
    </div>
  );
};

export default PostJob;


  /* <Select>
<SelectTrigger className="w-[180px]">
  <SelectValue placeholder="Select a company"/>
</SelectTrigger>
<SelectContent>
  <SelectGroup>
    {
      companies.map((company)=>{
        return (
          <SelectItem value="apple">{company.name}</SelectItem>
        )
      })
    }
  </SelectGroup>
</SelectContent>
</Select> */

