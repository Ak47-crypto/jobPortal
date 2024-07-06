"use client"
import React, { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
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
    }
    handleFetchJob();
  },[])
  return (
    <>
      <main>
        
        <section className="flex flex-col items-center mt-10 gap-y-8">
          <h1 className="font-bold text-4xl w-[56rem] mb-10">List Jobs</h1>
          {jobData.length>0?(
            jobData.map((job,index)=>(
                <JobCard key={job._id} job={job}/>
            ))
          ):(
            <p>No jobs Found</p>
          )}
          
        </section>
      </main>
    </>
  );
}

export default JobList;
