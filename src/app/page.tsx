"use client";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/SiteContext";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, IndianRupee, Pizza, Terminal, Loader2 } from "lucide-react";
import { searchSchema } from "@/schemas/searchSchema";
import { jobFilterSchema } from "@/schemas/jobFilterSchema";
import { newsLetterSchema } from "@/schemas/newsLetterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import JobCard, { JobCard2 } from "@/components/JobCard";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
export default function Home() {
  const { accounts,setTitleFilter } = useAppContext();
  const refButton = useRef<HTMLButtonElement>(null);
  const [allJobs, setAllJobs] = useState<JobType[]>([]);
  const [activeJob, setActiveJob] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showJobDetails, setShowJobDetails] = useState<JobType>();
  const [startIndex, setStartIndex] = useState<number>(4);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [isSendingEmail,setIsSendingEmail]=useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const handleFetchAllJob = async () => {
      try {
        const sIndex = 0;
        const eIndex = 4;
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
          if (data.job.length < 4) {
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

  const handleClick = async () => {
    const endIndex = startIndex + 4;
    try {
      setIsFetching(true);
      const response = await fetch("/api/fetch-all-job", {
        method: "POST",
        headers: {
          "CONTENT-TYPE": "application/json",
        },
        body: JSON.stringify({ startIndex, endIndex, location: filter }),
      });
      const data: Data = await response.json();
      if (data.success == true) {
        setActiveJob(0);
        if (data.job.length == 0) {
          setReachedEnd(true);
          // toast({
          //   title:'Message',
          //   description:'No more jobs to display',
          //   variant:'default'
          // })
          return;
        }
        if (data.job.length < 4) {
          setReachedEnd(true);
        }
        setAllJobs(data.job);
        console.log(allJobs);

        setShowJobDetails(data.job[0]);
        setStartIndex(endIndex);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const [filterLocation, setFilterLocation] = useState<
    z.infer<typeof searchSchema>
  >({ query: "" });
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });
  const form2 = useForm<z.infer<typeof jobFilterSchema>>({
    resolver: zodResolver(jobFilterSchema),
    defaultValues: {
      filter: "",
    },
  });
  const form3 = useForm<z.infer<typeof newsLetterSchema>>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleNewsLetterEmail=async (data: z.infer<typeof newsLetterSchema>)=>{
    try {
      setIsSendingEmail(true)
      const response = await fetch("/api/send-email",{
        method:"POST",
        headers:{
          "CONTENT-TYPE":"application/json"
        },
        body:JSON.stringify({...data})
      })
      const data2 = await response.json();
      if(data2.success==true){
        toast({
          title:"Message",
          description:"Subscribed to newsletter"
        })
      }else {
        toast({
          title:"Message",
          description:`${data2.message}`,
          variant:"destructive"
        })
      }
      console.log(data2)
    } catch (error) {
      console.log(error)
    }finally{
      setIsSendingEmail(false)
    }

  }
  const onSubmitSearch = (data: z.infer<typeof searchSchema>) => {
    setTitleFilter(data.query)
    router.push(`/jobs-and-opportunity`)
    console.log("query button ");
  };
  const handleShowJobDetails = (index = 0) => {
    setActiveJob(index);
    setShowJobDetails(allJobs[index]);
  };
  const onFilterApplied = (data: z.infer<typeof jobFilterSchema>) => {
    setFilter(data.filter);
    console.log(data);
  };
  return (
    <main>
      {/* <Navbar /> */}
      <section
        id="hero section"
        className="flex items-center justify-center bg-slate-200 border rounded-3xl relative"
      >
        <div className="flex gap-y-10 flex-col py-14 ">
          <h1 className="text-[64px] font-semibold text-center">
            Jobs for UnSkilled Youth
            <br />
            No Experience? No Problem
          </h1>

          <p className="text-[32px]">
            Empowering Youth through No Experience Job Opportunities
          </p>
          <div className="flex justify-center">
            <Link href={"/jobs-and-opportunity"}>
            <Button className="w-40 h-14 text-2xl mb-5 rounded-xl">
              Find Job
            </Button>
            </Link>
          </div>
        </div>

        <div
          id="search-bar"
          className="w-[1174px] h-32 border shadow-md absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-[30px] "
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitSearch)}
              className="flex justify-center items-center h-full gap-x-12"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <div className=" relative border rounded-[40px] w-[413px] h-[44px] py-[11px] pl-[16px] pr-[40px] bg-white">
                      <div className="absolute inset-y-0 left-0 flex justify-end w-full pointer-events-none pr-[16px]">
                        <Search className="my-auto" />
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Search for jobs....."
                          className="  w-full h-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none rounded-2xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-5" />
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="text-white bg-[#0073e6] rounded-xl hover:bg-blue-500"
              >
                Search
              </Button>
            </form>
          </Form>
        </div>
      </section>
      <section id="job-display" className=" m-20 mt-24">
        <h1 className="text-center text-[48px] font-semibold">Featured Jobs</h1>
        <div className="flex justify-center  space-x-6 p-6">
          <div
            id="filterr"
            className="flex flex-col gap-y-4 border border-black rounded-3xl min-w-[300px] h-fit p-4 mt-4"
          >
            <h1 className="text-center font-semibold text-[28px]">Filter</h1>
            <p className="text-[24px] font-light">Location</p>
            <div>
              <Form {...form2}>
                <form
                  onSubmit={form2.handleSubmit(onFilterApplied)}
                  className="flex justify-center items-center h-full gap-x-12"
                >
                  <FormField
                    control={form2.control}
                    name="filter"
                    render={({ field }) => (
                      <FormItem>
                        <div className=" relative border rounded-[40px] w-[281px] h-[66px] py-[11px] pl-[16px] pr-[40px] bg-white">
                          <div className="absolute inset-y-0 left-0 flex justify-end w-full pointer-events-none pr-[16px]">
                            <MapPin className="my-auto" />
                          </div>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter job location....."
                              className="  w-full h-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none rounded-2xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="mt-3" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" ref={refButton} className="hidden">
                    submit
                  </Button>
                </form>
              </Form>
            </div>
            <p className="text-[24px] font-light">Employment type</p>
            <div className="flex  gap-x-4 items-center p-2">
              <Checkbox checked={true} disabled className="w-[40px] h-[35px]" />
              <p className="text-[24px] font-medium">Wage based</p>
            </div>

            <p className="text-[24px] font-light">Special Skills</p>
            <div className="flex  gap-x-4 items-center p-2">
              <Checkbox checked={true} disabled className="w-[40px] h-[35px]" />
              <p className="text-[24px] font-medium">Un-Skilled</p>
            </div>
            <Button
              onClick={() => {
                if (refButton.current) {
                  refButton.current.click();
                }
              }}
              className="bg-[#0073e6] hover:bg-[#2062E2]"
            >
              Apply
            </Button>
          </div>

          <div id="job-list" className="">
            <div className="flex flex-col  items-center gap-y-6 py-10 rounded-3xl min-w-[600px]  min-h-[727px]">
              {isFetching ? (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 mb-4 w-[600px]"
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
                      
                        index < 4 && (
                          <div
                            key={job._id}
                            onClick={() => handleShowJobDetails(index)}
                            className={`hover:cursor-pointer rounded-3xl`}
                          >
                            <JobCard2
                            
                              job={job}
                              border={
                                activeJob == index ? "border-2" : "border"
                              }
                            />
                          </div>
                        )
                      
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
              <Button
                size={"lg"}
                onClick={handleClick}
                disabled={reachedEnd}
                className={`mt-auto bg-[#0073e6] w-40 hover:bg-[#2062E2]  ${
                  reachedEnd ? "bg-black" : "bg-[#18408E]"
                } transition ease-out`}
              >
                {reachedEnd ? "No more jobs to show" : "Show more jobs"}
              </Button>
            </div>
          </div>
          <div id="job-details" className="">
            {isFetching ? (
              <>
                <div className="border border-black flex flex-col gap-y-4 p-4 rounded-3xl w-[425px] min-h-[727px]">
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
                  <div className="border border-black flex flex-col gap-y-4 p-4 rounded-3xl w-[425px] min-h-[727px]">
                    <p className="text-[28px]">{showJobDetails?.title}</p>
                    <p className="text-[24px]  text-[#113E4D] overflow-x-scroll">
                      Provider:{showJobDetails?.provider.slice(0, 200)}
                    </p>
                    <div className="flex gap-x-2 text-[24px] font-light items-centerx">
                      <MapPin className="w-6 h-6 mt-1" />
                      <p>{showJobDetails?.location}</p>
                    </div>
                    <div className="flex gap-x-2 text-[24px] font-light items-center">
                      <IndianRupee />
                      {showJobDetails?.salary} a day
                    </div>
                    
                    <Link
                    href={`/jobs-and-opportunity/${showJobDetails.provider}-${showJobDetails.jobId}`}
                    target="_blank"
                    >
                    <Button
                      size={"lg"}
                      className="w-[200px] h-[48px] py-4 p-4 rounded-xl bg-[#0073e6] hover:bg-blue-700"
                      // onClick={()=>router.push(`/jobs-and-opportunity/${showJobDetails.provider}-${showJobDetails.jobId}`)}
                    >
                      Apply
                    </Button>
                    </Link>
                    <p className="text-[20px] font-semibold">Job description</p>
                    <p className="text-[20px]">{showJobDetails?.description}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-center space-x-6 p-4">
          <div className="flex flex-col rounded-3xl  border  border-black w-[670px] p-6 space-y-5 items-center">
            <h1 className="text-center  text-[36px] font-bold">
              Post a featured job
            </h1>
            <p className="  text-[24px] text-start">
              Posting a featured job increases visibility and attracts top
              talent. It stands out on the job board and often receives
              additional promotion through social media and email, boosting the
              chances of finding the right candidate..
            </p>
            <Button
              className="bg-[#2062E2] text-white text-xl w-80 rounded-3xl h-16"
              size={"sm"}
            >
              Post a free job
            </Button>
          </div>
          <div className="flex flex-col rounded-3xl bg-[#2062E2] w-[670px] p-6 space-y-5 items-center">
            <h1 className="text-center text-white text-[36px] font-bold">
              Post a free job
            </h1>
            <p className=" text-white text-[24px] text-start">
              Posting a free job listing is budget-friendly and reaches a large
              pool of job seekers, offering a cost-effective solution for
              filling positions with qualified candidates. It can also help
              build a talent pipeline for future job openings.
            </p>
            <Button
              className="bg-white hover:bg-white text-black text-xl w-80 rounded-3xl h-16"
              size={"sm"}
            >
              Post a free job
            </Button>
          </div>
        </div>
      </section>

      <section id="news-letter" className="m-4 mt-20">
        <Separator />
        <div className="flex justify-between p-16 space-x-4">
          <div className="" id="text">
            <h1 className="text-[48px] font-bold text-[#2062E2]">JobPortal</h1>
            <p className="text-[26px]">
              Join our newsletter and receive a weekly update
              <br />
              of the top job openings directly in your inbox.
            </p>
          </div>
          <div className="mt-auto">
            <Form {...form3}>
              <form
                onSubmit={form3.handleSubmit(handleNewsLetterEmail)}
                className="flex justify-center items-center h-full gap-x-12"
              >
                <FormField
                  control={form3.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className=" relative border border-black rounded-[40px] w-[613px] h-[88px] py-[11px] pl-[16px] pr-[40px] bg-white">
                        <div className="absolute inset-y-0 right-0 flex justify-end  items-center  pr-[16px] ">
                          {/* <Search className="my-auto" /> */}
                          <Button
                            type="submit"
                            className="rounded-3xl text-white text-xl bg-[#2062E2]"
                            size={"lg"}
                            disabled={isSendingEmail}
                          >
                            {isSendingEmail?(<><Loader2 className=" animate-spin"/>Subscribing</>):
                            "Subscribe"}
                          </Button>
                        </div>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your email"
                            className="  w-[413px] h-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none rounded-2xl placeholder:text-xl text-xl pr-10"
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
          </div>
        </div>
      </section>
    </main>
  );
}
