import React from "react";
import Navbar from "./shared/Navbar";
import FilterJob from "./FilterJob";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-3">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterJob />
          </div>
            {
                jobsArray.length < 0 ? (<span>No jobs found</span>) : 
                (
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        <div className="grid grid-cols-3 gap-4">
                            {
                                jobsArray.map((job,index)=>(
                                    <div>
                                        <Job/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
      </div>
    </div>
  );
};

export default Jobs;
