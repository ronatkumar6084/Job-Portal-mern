import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({job}) => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
      <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
      <p className='text-sm text-gray-500'>{job?.location}</p>
    </div>
    <div>
      <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
      <p className='text-sm text-gray-600'>{(job?.description).slice(0,85)}</p>
    </div>
    <div className='flex items-center gap-2 mt-4'>
      <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>{job?.vacancies} Vacancies</Badge>
      <Badge className={"text-[#a232ce] font-bold"} variant={"ghost"}>{job?.jobType}</Badge>
      <Badge className={"text-[#463aece1] font-bold"} variant={"ghost"}>{job?.salary} LPA</Badge>
    </div>
    </div>
  )
}

export default LatestJobCards
