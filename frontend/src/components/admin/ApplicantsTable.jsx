import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
    const {allApplicants} = useSelector(store =>store.application);

    const statusHandler = async(status, id) =>{
        console.log("called");       
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status},{
                withCredentials:true,
            });
            console.log(res);
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

  return (
    <div>
     <Table>
        <TableCaption> A list of your recent applied users.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Fullname</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
        {
                allApplicants && allApplicants?.applications.map((item)=>(
                <tr key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                    {
                    item?.applicant?.profile?.resume ? 
                    <a className="hover:text-blue-600 hover:underline cursor-pointer" href={item?.applicant?.profile?.resume} 
                    target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>N/A</span>
                    }
                </TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className='float-right cursor-pointer'>
                    <Popover>
                        <PopoverTrigger>
                            <MoreHorizontal/>
                        </PopoverTrigger>
                        <PopoverContent className="w-42">
                        {
                        shortListingStatus.map((status, index)=>{
                            return (
                                <div onClick={()=>statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                    <span>{status}</span>
                                </div>
                                 )
                            })
                        }
                        </PopoverContent>
                    </Popover>  
                 </TableCell>
                </tr>
            ))
        }            
        </TableBody>
     </Table>
    </div>
  )
}

export default ApplicantsTable
