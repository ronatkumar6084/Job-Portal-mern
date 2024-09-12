import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import useGetAllApplicants from '@/hooks/useGetAllApplicants'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const Applicants = () => {
    useGetAllApplicants();
    const navigate = useNavigate();
    const {allApplicants} = useSelector(store=>store.application);
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center gap-5'>
        <Button onClick={() => navigate("/admin/jobs")}
              variant="outline" className="flex items-center gap-2 text-gray-500 font-semi">
              <ArrowLeft />
              <span>Back</span>
         </Button>
       <h1 className='font-bold text-xl my-5'>Applicants <span>{allApplicants?.applications?.length}</span></h1>
        </div> 
      <ApplicantsTable/>
      </div>    
    </div>
  )
}

export default Applicants
