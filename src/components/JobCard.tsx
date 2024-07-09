import React, { useEffect, useState } from "react";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import { MapPin } from "lucide-react";
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
  border?: string;
  styles?: string;
}
export default function JobCard({ job, border }: JobCardProps) {
  const [jobDate, setJobDate] = useState<Date>();
  useEffect(() => {
    const date = new Date(Number(job.timestamp) * 1000);
    setJobDate(date);
  }, []);
  return (
    <div
      className={`bg-white border border-blackx shadow-mdx rounded-3xl    min-w-[56rem]`}
    >
      <div className="grid grid-cols-[auto_1fr]">
        <Image
          src={"/logo.svg"}
          width={100}
          height={24}
          alt={` logo`}
          className=" rounded-full m-auto scale-110"
        />
        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-[32px] font-medium">{job.title}</h2>
              <p className="text-gray-600 decoration-solid text-[32px] underline">
                Id:{job.jobId}
              </p>
              <p className="text-gray-500 decoration-solid text-xl mt-2">
                {job.description.slice(0, 50) + "....."}
              </p>
              <p className="text-gray-500 decoration-solid text-xl mt-2">
                Status:{job.isActive ? "Active" : "Not active"}
              </p>
            </div>

            <p className="text-gray-500 text-[24px] mr-4">
              {dayjs().to(dayjs(jobDate).format("MMM D, YYYY h:mm A"))}
            </p>
          </div>
          <div className="mt-4 flex justify-end items-center gap-x-2 mr-4">
            <MapPin className="text-gray-500 w-[28px] h-[28px]" />
            <p className="text-gray-500 font-normal text-[28px]">
              {job.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobCard2({ job, border }: JobCardProps) {
  const [jobDate, setJobDate] = useState<Date>();
  useEffect(() => {
    const date = new Date(Number(job.timestamp) * 1000);
    setJobDate(date);
  }, []);
  return (
    <div
      className={`bg-white ${border} border-black shadow-mdx rounded-3xl  min-w-[600px] `}
    >
      <div className="grid grid-cols-[auto_1fr]">
        <Image
          src={"/logo.svg"}
          width={100}
          height={24}
          alt={` logo`}
          className=" rounded-full m-auto scale-110"
        />
        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-[32px] font-medium">{job.title}</h2>

              <p className="text-gray-500 decoration-solid text-xl mt-2">
                Status:{job.isActive ? "Active" : "Not active"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-[24px] mr-4 text-right">
                {dayjs().to(dayjs(jobDate).format("MMM D, YYYY h:mm A"))}
              </p>
              <div className="mt-4 flex justify-end items-center gap-x-2 mr-4">
                <MapPin className="text-gray-500 w-[28px] h-[28px]" />
                <p className="text-gray-500 font-normal text-[28px]">
                  {job.location.slice(0, 5) + "....."}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="mt-4 flex justify-end items-center gap-x-2 mr-4">
        <MapPin className='text-gray-500 w-[28px] h-[28px]'/>
        <p className="text-gray-500 font-normal text-[28px]">{job.location}</p>
      </div> */}
        </div>
      </div>
    </div>
  );
}

// job card 3

export function JobCard3({ job, styles, border }: JobCardProps) {
  const [jobDate, setJobDate] = useState<Date>();
  useEffect(() => {
    const date = new Date(Number(job.timestamp) * 1000);
    setJobDate(date);
  }, []);
  return (
    <div
      className={`bg-white ${styles} group shadow-md    min-w-[400px] h-[165px]`}
    >
      <div className="grid grid-cols-[auto_1fr]  pt-2">
        <Image
          src={"/logo.svg"}
          width={100}
          height={24}
          alt={` logo`}
          className=" rounded-full m-auto scale-110"
        />
        <div className="p-6">
          <div className="flex justify-between space-x-4 items-center">
            <div>
              <h2 className={`text-2xl font-medium ${border}`}>{job.title}</h2>

              <p className="text-gray-500 decoration-solid text-xl mt-2">
                Status:{job.isActive ? "Active" : "Not active"}
              </p>
            </div>
            <div className="">
              <p className="text-gray-500 text-xl mr-4 text-right">
                {dayjs().to(dayjs(jobDate).format("MMM D, YYYY h:mm A"))}
              </p>
              <div className="mt-4 flex justify-end items-center gap-x-2 mr-4">
                <MapPin className="text-gray-500 w-4" />
                <p className="text-gray-500 font-normal text-xl text-right">
                  {job.location.slice(0, 5) + "....."}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="mt-4 flex justify-end items-center gap-x-2 mr-4">
        <MapPin className='text-gray-500 w-[28px] h-[28px]'/>
        <p className="text-gray-500 font-normal text-[28px]">{job.location}</p>
      </div> */}
        </div>
      </div>
    </div>
  );
}
