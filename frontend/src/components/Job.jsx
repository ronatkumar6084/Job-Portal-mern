import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();
  //const jobId = "qwertyuiop123456789";
  const daysAgo = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-400">
      <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} Days ago`}</p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
      </div>
     
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{(job?.description.slice(0,70))}</p>
      </div>
    <div className='flex items-center gap-2 mt-4'>
      <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>{job?.vacancies} Vacancies</Badge>
      <Badge className={"text-[#a232ce] font-bold"} variant={"ghost"}>{job?.jobType}</Badge>
      <Badge className={"text-[#463aece1] font-bold"} variant={"ghost"}>{job?.salary} LPA</Badge>
    </div>
    <div className="flex items-center gap-4 mt-4">
      <Button job={job} onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
      <Button className="bg-[#121097f5]">Save for later</Button>
    </div>
    </div>
  );
};

export default Job;
