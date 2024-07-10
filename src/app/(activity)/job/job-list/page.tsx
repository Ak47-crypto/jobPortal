"use client"
import React, { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
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
function JobList() {
  const [jobData, setJobData] = useState<JobType[]>([]);
  const [isFetching,setIsFetching]=useState<boolean>(true)
  useEffect(()=>{
    const handleFetchJob=async()=>{
        const response = await fetch('/api/get-job',{
            method:"GET",
            headers:{
                "CONTENT-TYPE":"application/json"
           },
        })
        const data=await response.json();
        console.log(data.job);
        
        if(data.success==true){
            setJobData(data.job)
            console.log(jobData);
            
        }
        setIsFetching(false)
    }
    handleFetchJob();
  },[])
  return (
    <>
      <main>
      {isFetching ? (
            <>
            <section className="flex flex-col items-center mt-10 gap-y-8">
            <h1 className="font-bold text-4xl w-[56rem] mb-10">List Jobs</h1>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 mb-4  w-1/2 p-16 rounded-xl border bg-white"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
              </section>
            </>
          ):(
        <section className="flex flex-col items-center mt-10 gap-y-8 mb-4">
          <h1 className="font-bold text-4xl w-[56rem] mb-10">List Jobs</h1>
          {jobData.length>0?(
            jobData.map((job,index)=>(
                <JobCard key={job._id} job={job}/>
            ))
          ):(
            <p>No jobs Found</p>
          )}
          
        </section>
          )}
      </main>
    </>
  );
}

export default JobList;
