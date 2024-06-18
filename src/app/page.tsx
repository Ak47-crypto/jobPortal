'use client'
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/SiteContext";
import Image from "next/image";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { searchSchema } from "@/schemas/searchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useEffect } from "react";
export default function Home() {
  const { accounts } = useAppContext()
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: ''
    }
  })
  const onSubmitSearch = (data: z.infer<typeof searchSchema>) => {
    alert('in search')
    console.log("query button ")
  }
  

  return (
    <main>
      {/* <Navbar /> */}
      <section id="hero section" className="flex items-center justify-center bg-slate-200 border rounded-3xl relative">
        <div className="flex gap-y-10 flex-col py-14 ">
          <h1 className="text-[64px] font-semibold text-center">Jobs for UnSkilled Youth
            <br />No Experience? No Problem</h1>

          <p className="text-[32px]">Empowering Youth through No Experience Job Opportunities</p>
          <div className="flex justify-center">
            <Button className="w-40 h-14 text-2xl mb-5 rounded-xl">Find Job</Button>
          </div>
        </div>

        <div id="search-bar" className="w-[1174px] h-32 border shadow-md absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-[30px] ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitSearch)} className="flex justify-center items-center h-full gap-x-12">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>

                    <div className=' relative border rounded-[40px] w-[413px] h-[44px] py-[11px] pl-[16px] pr-[40px] bg-white'>
                      <div className='absolute inset-y-0 left-0 flex justify-end w-full pointer-events-none pr-[16px]'>
                        <Search className="my-auto" />
                      </div>
                      <FormControl>
                        <Input type="text" placeholder='Search for jobs.....' className='  w-full h-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none rounded-2xl'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage
                        className="mt-5"
                      />
                    </div>



                  </FormItem>
                )}
              />
              <Button type="submit" className="text-white bg-[#2062E2] rounded-xl hover:bg-blue-500">Search</Button>

            </form>
          </Form>
        </div>
      </section>
      <section id="job-display">

      </section>
    </main>
  );
}
