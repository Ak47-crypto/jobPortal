"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import JobCard, { JobCard2, JobCard3 } from "@/components/JobCard";
import dayjs from "dayjs";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StateDropdown from "@/components/District";
import { useAppContext } from "@/context/SiteContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AppWindow,
  CalendarDays,
  IndianRupee,
  ListFilter,
  MapPin,
  Pizza,
  Terminal,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { searchSchema } from "@/schemas/searchSchema";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import NoJob from "@/components/NoJob";
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
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isFetchingJobDetails, setIsFetchingJobDetails] =
    useState<boolean>(false);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [filterTitle, setFilterTitle] = useState<string | null>(null);
  const [allJobs, setAllJobs] = useState<JobType[]>([]);
  const [showJobDetails, setShowJobDetails] = useState<JobType>();
  const [activeJob, setActiveJob] = useState<number>(0);
  const { stateValue, setStateValue } = useAppContext();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });
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
          body: JSON.stringify({
            sIndex,
            eIndex,
            location: stateValue,
            title: filterTitle,
          }),
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
  }, [filterLocation, filterTitle, stateValue]);
  const handleShowJobDetails = (index = 0) => {
    if (activeJob == index) {
      return;
    }
    setIsFetchingJobDetails(true);
    setActiveJob(index);
    window.scrollTo({
      top: 0,
      // behavior: 'smooth' // This will make the scrolling smooth
    });

    setTimeout(() => {
      setShowJobDetails(allJobs[index]);
      setIsFetchingJobDetails(false);
    }, 500);
  };
  const onSubmitSearch = (data: z.infer<typeof searchSchema>) => {
    setFilterTitle(data.query);
  };
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f6f6]">
      {/* search bar */}
      <Separator />
      <div className="bg-white">
        <div className="grid grid-cols-[auto,1fr] h-full px-10 mx-10 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitSearch)}
              className="flex justify-centerx items-center h-full gap-x-12 py-4"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <div className=" relative border border-gray-300 rounded-[40px] min-w-[200px] h-[38px]  pl-[16px] pr-[40px] bg-white">
                      <div className="absolute inset-y-0 right-0 flex justify-end  items-center  ">
                        {/* <Search className="my-auto" /> */}
                        <Button
                          type="submit"
                          className="rounded-3xl text-white  bg-[#0073e6] hover:bg-blue-700"
                          size={"sm"}
                        >
                          Search
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Search Jobs..."
                          className="  w-[300px] h-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none rounded-2xl placeholder:text-xl text-xl "
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="mt-5" />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <section className="p-4 flex  space-x-4">
            <div className="h-full bg-slate-300 w-[1px]"></div>
            <ListFilter className="m-auto" />
            <div>
              <StateDropdown />
            </div>
          </section>
        </div>
      </div>
{/* ${allJobs.length>0?"grid-cols-[auto,1fr]":"flex"} */}
      {/* <div className={`grid grid-cols-[auto,1fr] h-full pt-1 px-10 mx-10`}> */}
      <div className={`flex  h-full pt-1 px-10 mx-10`}>
        <section
          id="left"
          className={`h-screen ${!isFetching?allJobs.length===0?"w-full" :"overflow-y-scroll  thin-scrollbar":''} flex flex-col space-y-3 mt-4 min-w-max `}
        >
          {isFetching ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 mb-4 w-full  p-16 rounded-xl bg-white"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </>
          ) : allJobs.length > 0 ? (
            allJobs.map((job, index) => (
              
                index < 8 && (
                  <div
                    key={job._id}
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
                )
              
            ))
          ) : (
            <div className=" w-full bg-white flex justify-center   items-center h-full mb-10 py-5">
              <NoJob />
            </div>
            
          )}
        </section>
        <section id="right" className={`${isFetching?"w-full":showJobDetails?"w-full":""}`}>
          <div id="job-details" className="">
            {isFetching || isFetchingJobDetails ? (
              <>
                <div className="bg-white  flex flex-col gap-y-4 p-4 rounded-xl w-full ml-4 mt-4 ">
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
                {!showJobDetails?'':
                (<div className="  flex flex-col gap-y-4 p-4 w-full min-h-[727px]">
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
                        {dayjs(
                          new Date(Number(showJobDetails?.timestamp) * 1000)
                        ).format("MMM D, YYYY h:mm A")}
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
                          {dayjs(
                            new Date(Number(showJobDetails?.timestamp) * 1000)
                          ).format("MMM D, YYYY h:mm A")}
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
                        <h3 className="text-base font-medium">
                          Job location{"(s)"}
                        </h3>
                        <h4 className="mt-2 text-[#727272]">
                          {showJobDetails?.location}
                        </h4>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="border-2 rounded-xl p-4">
                        <h3 className="text-base font-medium">Salary</h3>
                        <div className="flex items-center">
                          <IndianRupee className="text-[#727272] mt-2" />
                          <h4 className="mt-2 text-[#727272] text-xl">
                            {showJobDetails?.salary} a day
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default JobsAndOpportunity;
