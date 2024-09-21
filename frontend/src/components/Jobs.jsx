import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterJob from "./FilterJob";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
//import { setSearchedQuery } from "@/redux/jobSlice";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Jobs = () => {
  const {allJobs, searchedQuery} = useSelector(store=>store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  //const dispatch = useDispatch();

    useEffect(()=>{
       if(searchedQuery){
          const filteredJobs = allJobs.filter((job)=>{
            return job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
            job?.location.toLowerCase().includes(searchedQuery.toLowerCase())
          })
          setFilterJobs(filteredJobs)
       } else {
         setFilterJobs(allJobs)
       }
      
    },[allJobs, searchedQuery])

    // useEffect(()=>{
    //   return ()=>{
    //     dispatch(setSearchedQuery(""));
    //   }
    // },[])

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-3">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterJob />
          </div>
            {
                filterJobs.length < 0 ? <span>No jobs found</span> : 
                (
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                        <div className="grid grid-cols-3 gap-4">
                            {
                                filterJobs.map((job)=>(
                                    <motion.div 
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                    key={job._id}>
                                        <Job job={job}/>
                                    </motion.div>
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
