"use client"
import React, { useEffect, useState } from "react";
import {JobCard4} from "@/components/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ethers } from "ethers";
import abi from "@/contract/JobPortal.json"
import { toast } from "@/components/ui/use-toast";
interface JobType {
  provider: string;
  jobId: number;
  title?: string;
  timestamp: string;
  isAccepted: boolean;
}
function JobList() {
  const [jobData, setJobData] = useState<JobType[]>([]);
  const [isFetching,setIsFetching]=useState<boolean>(true)
  const [appliedJob,setAppliedJob]=useState<[]>([])
  useEffect(()=>{
    const handleFetchJob=async()=>{
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,abi.abi,signer)
        const responseContract = await contract.getMyApplications();
        const result = responseContract.map((obj:any) => ({ ...obj }));
        const result2=result.map((obj:any)=>({
            jobId: parseInt(obj[1]?.toString() || ''),
            provider: obj[2] || '',
            timestamp: obj[3]?.toString() || '',
            isAccepted: obj[4] || false
          }))
        console.log(result2)
        setJobData(result2)
        setIsFetching(false)
        } catch (error:any) {
            toast({
                title:"Message",
                description:error.shortMessage,
                variant:"destructive"
            })
        }
        
    }
    handleFetchJob();
  },[])
  return (
    <>
      <main>
      {isFetching ? (
            <>
            <section className="flex flex-col items-center mt-10 gap-y-8">
            <h1 className="font-bold text-4xl w-[56rem] mb-10">My Applications{jobData[0]?.provider}</h1>
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
          <h1 className="font-bold text-4xl w-[56rem] mb-10">My Applications</h1>
          {jobData.length>0?(
            jobData.map((job,index)=>(
                <JobCard4 key={job.jobId+job.provider} job={job}/>
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
