"use client";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/userType";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
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
import { jobSchema } from "@/schemas/jobSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
function Job() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType | undefined>(undefined);
  useEffect(() => {
    const data = Cookies.get("userData");
    console.log(data)
    if (data) {
      const dataParsed:UserType = JSON.parse(data);
      if(!(dataParsed.role=='provider'))
        router.push('/')
      setUserData(dataParsed);
    }else
    router.push('/')
  }, []);
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      location:"",
      salary:'',
      description: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof jobSchema>) => {};

  return (
    <>
      <main className="bg-[#D3E3E8] h-full  ">
        <div className="w-full p-32">
          <div className="max-w-2xl m-auto">
            <h1 className="text-[64px] font-semibold text-justify mb-5">
              Find Your Next Hire Post a Job Today
            </h1>
            <p className="font-normal text-[32px] text-justify text-gray-400">
              Take the first step towards building your dream team by posting a
              job today
            </p>
            {/* <Button></Button> */}
          </div>
        </div>
      </main>
      {/* grid */}
      <section className="grid grid-cols-2 mt-20 px-40">
        <div id="col-1">
          <div className="mb-44">
          <h1 className="text-[32px]">1. Job poster information</h1>
          <p className="text-[16px] text=[#000000] opacity-75">
            Stay organized and informed by having
            <br /> all your job poster information in one place.
          </p>
          </div>
          <div>
          <h1 className="text-[32px]">2. Job information</h1>
          <p className="text-[16px] text=[#000000] opacity-75">
          Stay informed and make informed hiring<br/>decisions with complete and detailed job information.
          </p>
          </div>
        </div>

        <div id="col-2">
          <div className="border-2 shadow-mdx rounded-3xl">
            {/* job owner section */}
            <div className="grid grid-cols-2 p-10 gap-4">
              <div>
                <p className="font-normal  mb-5">Full name</p>
                <Input
                  className="rounded-3xl"
                  placeholder={`${userData?.name}`}
                  disabled={true}
                />
              </div>
              <div>
                <p className="font-normal  mb-5">Email address</p>
                <Input
                  className="px-10 rounded-3xl"
                  placeholder={`${userData?.email}`}
                  disabled={true}
                />
              </div>
            </div>
            <Separator className="w-[32rem] m-auto" />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className=" p-10 space-y-8"
              >
                <div className="grid grid-cols-2 gap-4 gap-y-20">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal ">Job title <span className="text-[#F10303]">*</span></FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-3xl"
                            placeholder="Enter job title"
                            type="text"
                            {...field}
                            required
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between">
                          <FormLabel className="mt-2 font-normal">
                            Job location <span className="text-[#F10303]">*</span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            className="rounded-3xl"
                            placeholder="Enter job loaction"
                            type="text"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem className="col-span-2x">
                        <div className="flex justify-between">
                          <FormLabel className="mt-1 font-normal">
                            Job salary <span className="text-[#F10303]">*</span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            className="rounded-3xl "
                            placeholder="Daily salary in rupees"
                            type="number"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="">
                    <p className="mb-3 font-normal leading-none text-sm">Job status</p>
                    <Input disabled placeholder="Active" className="rounded-3xl"/>
                  </div>
                  <FormField
                    
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <div className="flex justify-between">
                          <FormLabel className="mt-1 font-normal">
                            Enter job description <span className="text-[#F10303]">*</span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Textarea
                            className="rounded-3xl placeholder:p-1"
                            placeholder="Please submit a thorough job description that encompasses all necessary requirements, responsibilities, and any other relevant details."
                            
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  size={"lg"}
                  type="submit"
                  variant={"default"}
                  disabled={isSubmitting}
                  className="bg-[#2062E2] rounded-3xl"
                  
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Post Job"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Job;
