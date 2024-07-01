import { Button } from '@/components/ui/button'
import React from 'react'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { jobSchema } from '@/schemas/jobSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
function Job() {
    const form = useForm<z.infer<typeof jobSchema>>({
        resolver:zodResolver(jobSchema),
        defaultValues:{
            title:'',
            description:'',
            tag:''
        }
    })
const handleSubmit=async(data:z.infer<typeof jobSchema>)=>{

}
  return (
    <>
    <main className='bg-[#D3E3E8] h-full  '>
        <div className='w-full p-32'>
            <div className='max-w-2xl m-auto'>
                <h1 className='text-[64px] font-semibold text-justify mb-5'>Find Your Next Hire  Post a Job Today</h1>
                <p className='font-normal text-[32px] text-justify text-gray-400'>Take the first step towards building your dream team by posting a job today</p>
                {/* <Button></Button> */}
                </div>
        </div>
        </main>
        {/* grid */}
        <section className='grid grid-cols-2 mt-20 px-40'>
            <div id='col-1'>
                <h1 className='text-[36px]'>1. Job poster information</h1>
                <p>Stay organized and informed by having 
                all your job poster information in one place.</p>
            </div>

            <div id='col-2'>
            <h1 className="font-normal text-xl px-10 pt-5">Provider Profile</h1>
          <p className="px-10 py-2 text-sm text-gray-400">
            Fill out the details. Click sign up when you're done.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" p-10 space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="mt-2 font-normal">
                        Email address
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
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
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="mt-1 font-normal">
                        Wallet address
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter your walletAddress"
                        type="text"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant={"default"} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
            </div>
        </section>
        </>
  )
}

export default Job