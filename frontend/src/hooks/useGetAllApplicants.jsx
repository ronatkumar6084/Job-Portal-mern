import { setAllApplicants } from '@/redux/applicationSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const useGetAllApplicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
  useEffect(()=>{
      const fetchAllApplicants = async() =>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
                withCredentials:true,
            });
            console.log(res.data);           
            dispatch(setAllApplicants(res.data.job));
        } catch (error) {
            console.log(error);
            
        }
      }
      fetchAllApplicants();
  },[])
}

export default useGetAllApplicants

