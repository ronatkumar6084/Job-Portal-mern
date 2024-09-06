import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "qwertyuiop123456789";
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-400">
      <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">2 Days ago</p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
      </div>
     
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.logodesign.net/logo/line-art-buildings-in-swoosh-1273ld.png?nwm=1&nws=1&industry=company&sf=&txt_keyword=All" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima eum omnis officiis unde possimus numquam fugiat! Laudantium, repudiandae illo!</p>
      </div>
    <div className='flex items-center gap-2 mt-4'>
      <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>12 Vacancies</Badge>
      <Badge className={"text-[#a232ce] font-bold"} variant={"ghost"}>Part Time</Badge>
      <Badge className={"text-[#463aece1] font-bold"} variant={"ghost"}>12 LPA</Badge>
    </div>
    <div className="flex items-center gap-4 mt-4">
      <Button onClick={()=> navigate(`/description/${jobId}`)} variant="outline">Details</Button>
      <Button className="bg-[#121097f5]">Save for later</Button>
    </div>
    </div>
  );
};

export default Job;
