import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=> store.job)
  return (
    <div>
     <Table>
        <TableCaption>A list of your Applied Job</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                 allAppliedJobs?.length <=0 ? <span>You hav'nt applied any job yet</span> : allAppliedJobs.map((appliedJob)=> (
                    <TableRow key={appliedJob?._id}>
                        <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob?.job?.title}</TableCell>
                        <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? "bg-red-600" : appliedJob?.status === "pending" ? "bg-gray-600" : "bg-green-800" }`}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
     </Table>
    </div>
  )
}

export default AppliedJobTable
