"use client";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { CalendarDays, IndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
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
function Slug({ params }: { params: { slug: string } }) {
  const [showJobDetails, setShowJobDetails] = useState<JobType>();
  console.log(params);
  useEffect(() => {
    const handleFetchJob = async () => {
      const lastDashIndex = params.slug.lastIndexOf("-");

      if (lastDashIndex === -1) {
        throw new Error(
          "Invalid slug format. Expected format: '{walletAddress-jobId}'"
        );
      }

      const walletAddress = params.slug.slice(0, lastDashIndex);
      const jobId = params.slug.slice(lastDashIndex + 1);

      const response = await fetch("/api/fetch-one-job", {
        method: "POST",
        headers: {
          "CONTENT-TYPE": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          jobId,
        }),
      });
      const data =await response.json();
      if(data.success==true){
        setShowJobDetails(data.data)
      }
    };
    handleFetchJob()
  }, []);
  return (
    <main className="bg-[#f6f6f6]">
      <div className="flex justify-center mx-20">
        <section id="left">
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
                  {dayjs(
                    new Date(Number(showJobDetails?.timestamp) * 1000)
                  ).format("MMM D, YYYY h:mm A")}
                </p>
              </div>
            </div>
            
            
            <div className=" relative bg-white w-full py-5 rounded-xl">
              <div className="absolute w-[4px] h-[32.5px] bg-[#0073e6] rounded-r-full"></div>
              <p className="text-xl font-medium text-[#383838]  ml-4">
                About the job
              </p>
              <p className="ml-4 mt-4 w-[70%]">{showJobDetails?.description}</p>
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
                    <IndianRupee className="text-[#727272] mt-2" />
                    <h4 className="mt-2 text-[#727272] text-xl">
                      {showJobDetails?.salary} a day
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </section>
        <section id="right" className="mt-4">
        <div className="flex gap-x-2 text-[24px] font-light items-center justify-center bg-white w-full py-10 p-5 rounded-xl mb-4">
              
              <Button
                size={"lg"}
                className="w-[288px] h-[48px] py-4 p-4 rounded-xl bg-[#0073e6] hover:bg-blue-700"
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
        </section>
      </div>
    </main>
  );
}

export default Slug;
