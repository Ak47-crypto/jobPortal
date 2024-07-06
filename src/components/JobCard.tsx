import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MapPin } from 'lucide-react'
import dayjs from "dayjs";
dayjs.extend(relativeTime);
interface JobType {
  provider: string;
  jobId: number;
  title: string;
  location: string;
  salary: string;
  description: string;
  isActive: boolean;
  timestamp: string;
  _id: string;
}

interface JobCardProps {
  job: JobType;
}
function JobCard({job}:JobCardProps) {
  const [jobDate,setJobDate]=useState<Date>();
  useEffect(()=>{
    const date=new Date(Number(job.timestamp)*1000);
    setJobDate(date)
  },[])
  return (
    <div className="bg-white border border-black shadow-mdx rounded-3xl    min-w-[56rem]">
        <div className='grid grid-cols-[auto_1fr]'>
        <Image
            src={'/logo.svg'}
            width={100}
            height={24}
            alt={` logo`}
            className=" rounded-full m-auto scale-110"
          />
        <div className='p-4'>
      <div className="flex justify-between">
        
        
          
          <div >
            <h2 className="text-[32px] font-medium">{job.title}</h2>
            <p className="text-gray-600 decoration-solid text-[32px] underline">Id:{job.jobId}</p>
            <p className="text-gray-500 decoration-solid text-xl mt-2">{job.description.slice(0, 50) + '.....'}</p>
            <p className="text-gray-500 decoration-solid text-xl mt-2">Status:{job.isActive?'Active':'Not active'}</p>
          </div>
        
        <p className="text-gray-500 text-[24px] mr-4">{dayjs().to(dayjs(jobDate).format("MMM D, YYYY h:mm A"))}</p>
      </div>
      <div className="mt-4 flex justify-end items-center gap-x-2 mr-4">
        <MapPin className='text-gray-500 w-[28px] h-[28px]'/>
        <p className="text-gray-500 font-normal text-[28px]">{job.location}</p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default JobCard