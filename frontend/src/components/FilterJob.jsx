import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData =[
  {
    filterType:"Location",
    array:["Delhi NCR","Bhubaneswar","Hyderabad","Pune","Bangalore","Indore"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k", "42-1lakh", "1lakh to 5lakh"]
  }
]

const FilterJob = () => {
  return (
    <div className='w-full bg-white p-2 rounded-md'>
      <h1 className='font-bold text-gray-700'>Filter Jobs</h1>
      <hr className='mt-3'/>
        <RadioGroup>
            {
              filterData.map((data, index) =>(
                <div>
                  <h1 className='font-bold text-lg'>{data.filterType}</h1>
                  {
                    data.array.map((item,index) =>{
                      return (
                        <div className='flex items-center space-x-2 mt-2'>
                          <RadioGroupItem value={item}/>
                          <Label>{item}</Label>
                        </div>
                      )
                    })
                  }
                </div>
              ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterJob
