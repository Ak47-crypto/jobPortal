"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import JobCard, { JobCard2, JobCard3 } from "@/components/JobCard";
import dayjs from "dayjs";
import {
  AppWindow,
  CalendarDays,
  IndianRupee,
  MapPin,
  Pizza,
  Terminal,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
interface Data {
  success: boolean;
  jobs?: JobType[];
  job: JobType[];
}
function JobsAndOpportunity() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [allJobs, setAllJobs] = useState<JobType[]>([]);
  const [showJobDetails, setShowJobDetails] = useState<JobType>();
  const [activeJob, setActiveJob] = useState<number>(0);

  useEffect(() => {
    const handleFetchAllJob = async () => {
      try {
        const sIndex = 0;
        const eIndex = 8;
        setIsFetching(true);
        setReachedEnd(false);
        const response = await fetch("/api/fetch-all-job", {
          method: "POST",
          headers: {
            "CONTENT-TYPE": "application/json",
          },
          body: JSON.stringify({ sIndex, eIndex, location: filter }),
        });
        const data: Data = await response.json();
        if (data.success == true) {
          if (data.job.length < 8) {
            setReachedEnd(true);
          }
          setAllJobs(data.job);
          console.log(allJobs);

          setShowJobDetails(data.job[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    handleFetchAllJob();
  }, [setFilter, filter]);
  const handleShowJobDetails = (index = 0) => {
    setActiveJob(index);
    setShowJobDetails(allJobs[index]);
  };
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f6f6]">
      <div className="grid grid-cols-[auto,1fr] h-full p-10 mx-10">
        <section
          id="left"
          className="h-screen overflow-y-scroll thin-scrollbar flex flex-col space-y-3 mt-4"
        >
          {isFetching ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 mb-4 w-[400px]  p-16 rounded-xl bg-white"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {allJobs.length > 0 ? (
                allJobs.map((job, index) => (
                  <>
                    {index < 8 && (
                      <div
                        key={index}
                        onClick={() => handleShowJobDetails(index)}
                        // className={`hover:${"border-l-4 border-[#0073e6] border-opacity-50 cursor-pointer"}`}
                        // className={`${activeJob !== index ? "hover:border-l-4 hover:border-[#0073e6] hover:border-opacity-50 hover:cursor-pointer hover:rounded-l-none" : "border-l-4 border-white"}`}
                        className="h-[165px]x"
                      >
                        <JobCard3
                          job={job}
                          styles={
                            activeJob == index
                              ? "hover:cursor-pointer border-l-4  rounded-r-xl  rounded-l-none border-[#0073e6]"
                              : "border-l-4 hover:border-l-4 hover:border-[#0073e6] hover:border-opacity-50 hover:cursor-pointer rounded-xl hover:rounded-l-none transition-all duration-600 ease-in-out border-white"
                          }
                          border={
                            activeJob == index
                              ? "text-[#0073e6] transition-all duration-600 ease-in-out"
                              : "group-hover:text-[#0073e6] text-[#383838] group-hover:text-opacity-50 transition-all duration-600 ease-in-out"
                          }
                        />
                      </div>
                    )}
                  </>
                ))
              ) : (
                <>
                  <div className=" mt-32  flex flex-col justify-center items-center gap-5">
                    <Pizza className="w-40 h-40 text-gray-300  animate-spinx" />
                    {/* <Alert className="bg-[#E5E5E5] border border-dashed ">
                          <Terminal className="h-4 w-4" />
                          <AlertTitle>Heads up!</AlertTitle>
                          <AlertDescription>
                            You can add components to your app using the cli.
                          </AlertDescription>
                        </Alert> */}
                    <div className="border border-dashed border-black rounded-md p-5 ml-10 ">
                      <Terminal className="h-4 w-4 inline" />
                      <span>You have reached the end</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </section>
        <section id="right">
          <div id="job-details" className="">
            {isFetching ? (
              <>
                <div className="bg-white  flex flex-col gap-y-4 p-4 rounded-3xl w-full ml-6 mt-4">
                  <div className="flex flex-col items-centerx gap-y-4 p-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <div className="flex gap-x-2 text-[24px] font-light items-center">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-14 w-[200px] rounded-md" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[280px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[270px]" />
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[280px]" />
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[270px]" />
                    <Skeleton className="h-4 w-[300px]" />
                    <Skeleton className="h-4 w-[270px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {!showJobDetails ? (
                  <>
                    <div className="border border-black flex flex-col gap-y-4 p-4 rounded-3xl w-[425px] min-h-[727px] h-full">
                      <div className="flex justify-center items-center h-full">
                        <h1>Please select job to see its details</h1>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="  flex flex-col gap-y-4 p-4 w-full min-h-[727px]">
                    <div className="bg-white rounded-xl p-4">
                      <div className=" flex ">
                        <Image
                          src={"/logo.svg"}
                          width={82.2}
                          height={82.2}
                          alt="job image"
                          className="scale-110"
                        />
                        <div>
                          <p className="text-[32px] from-neutral-600 mb-2">
                            {showJobDetails?.title}
                          </p>
                          <p className="text-[20px]  text-[#113E4D]">
                            Provider:{showJobDetails?.provider}
                          </p>
                        </div>
                      </div>
                      <div className="flex mt-4">
                        <CalendarDays />
                        <p className="ml-2">
                          Posted on:
                          {dayjs(new Date(Number(showJobDetails?.timestamp)*1000)).format(
                            "MMM D, YYYY h:mm A"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-x-2 text-[24px] font-light items-centerx justify-end bg-white w-full py-10 pr-6 rounded-xl">
                      {/* <MapPin className="w-6 h-6 mt-1" />
                      <p>{showJobDetails?.location}</p> */}
                      {/* <AppWindow/> */}
                      <Button
                        size={"lg"}
                        className="w-[200px] h-[48px] py-4 p-4 rounded-xl bg-[#0073e6] hover:bg-blue-700"
                      >
                        Apply
                      </Button>
                    </div>
                    <div className=" relative bg-white w-full py-5 rounded-xl">
                      <div className="absolute w-[4px] h-[32.5px] bg-[#0073e6] rounded-r-full"></div>
                      <p className="text-xl font-medium text-[#383838]  ml-4">
                        Eligibility
                      </p>
                      <p className="ml-4 mt-4">Skilled or Unskilled</p>
                    </div>
                    <div className=" relative bg-white w-full py-5 rounded-xl">
                      <div className="absolute w-[4px] h-[32.5px] bg-[#0073e6] rounded-r-full"></div>
                      <p className="text-xl font-medium text-[#383838]  ml-4">
                        About the job
                      </p>
                      <p className="ml-4 mt-4 w-[70%]">
                        {showJobDetails?.description}
                      </p>
                    </div>
                    <div className=" relative bg-white w-full py-5 rounded-xl">
                      <div className="absolute w-[4px] h-[32.5px] bg-[#0073e6] rounded-r-full"></div>
                      <p className="text-xl font-medium text-[#383838]  ml-4">
                        Important dates and deadlines
                      </p>

                      <div className="flex iteam-center mt-4 ml-2">
                        <div className="p-3 border-2 rounded-xl">
                          <CalendarDays />
                        </div>
                        <div>
                          <p className="ml-4">Application posted on</p>
                          <p className="ml-4 text-base font-semibold">
                          {dayjs(new Date(Number(showJobDetails?.timestamp)*1000)).format(
                            "MMM D, YYYY h:mm A"
                          )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" relative bg-white w-full py-5 rounded-xl">
                      <div className="absolute w-[4px] h-[32.5px] bg-[#0073e6] rounded-r-full"></div>
                      <p className="text-xl font-medium text-[#383838]  ml-4">
                        Additional information
                      </p>
                      <div className="p-4">
                        <div className="border-2 rounded-xl p-4">
                          <h3 className="text-base font-medium">Job location{"(s)"}</h3>
                          <h4 className="mt-2 text-[#727272]">
                            {showJobDetails?.location}
                          </h4>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="border-2 rounded-xl p-4">
                          <h3 className="text-base font-medium">Salary</h3>
                          <div className="flex items-center">
                            <IndianRupee className="text-[#727272] mt-2"/>
                          <h4 className="mt-2 text-[#727272] text-xl">
                            {showJobDetails?.salary} a day
                          </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default JobsAndOpportunity;
