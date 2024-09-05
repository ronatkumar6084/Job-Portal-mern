import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-5xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="#">Browse</Link></li>
            
          </ul>
          {
            !user ?(
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline">Login</Button></Link>
               <Link to="/signup"> <Button className="bg-[#ee3d30] hover:bg-[#f5953b]">Signup</Button></Link>
              </div>              
            ) : (
              <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                  <h4 className="font-medium">Ronat Kumar Muni</h4>
                  <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                   <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2/>
                   <Button variant="link">View Profile</Button>
                   </div>
                   <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut/>
                   <Button variant="link">Logout</Button>
                   </div>               
                </div>
              </PopoverContent>
            </Popover>
            )
          }
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
