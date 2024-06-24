"use client";
import { useForm } from "react-hook-form";
import {
  signUpWorkerSchema,
  signUpProviderSchema,
} from "@/schemas/signInSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
function SignUp() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signUpWorkerSchema>>({
    resolver: zodResolver(signUpWorkerSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: "",
      skills: "",
      walletAddress: "",
    },
  });
  const form2 = useForm<z.infer<typeof signUpProviderSchema>>({
    resolver: zodResolver(signUpProviderSchema),
    defaultValues: {
      name: "",
      email: "",
      walletAddress: "",
    },
  });
  const handleSubmitWorker = async (
    data: z.infer<typeof signUpWorkerSchema>
  ) => {
    console.log(data);
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/sign-up/worker", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const data2 = await response.json();
      if (data2.success == true)
        toast({
          title: "Message",
          description: data2.message,
        });
      else {
        toast({
          title: "Message",
          description: data2.message,
          variant: "destructive",
        });
        form.setValue("email", "");
        form.setValue("walletAddress", "");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Message",
        description: "Server error",
        variant: "destructive",
      });
      form.setValue("email", "");
      form.setValue("walletAddress", "");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmitProvider = async (
    data: z.infer<typeof signUpProviderSchema>
  ) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/sign-up/provider", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const data2 = await response.json();
      if (data2.success == true)
        toast({
          title: "Message",
          description: data2.message,
        });
      else {
        toast({
          title: "Message",
          description: data2.message,
          variant: "destructive",
        });
        form2.setValue("email", "");
        form2.setValue("walletAddress", "");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Message",
        description: "Server error",
        variant: "destructive",
      });
      form2.setValue("email", "");
      form2.setValue("walletAddress", "");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="flex justify-center  bg-gray-200m ">
      <Tabs defaultValue="worker" className="w-f py-5 ">
        <TabsList className="grid w-full grid-cols-2 bg-whitex shadow-none">
          <TabsTrigger value="worker" className="data-[state=active]:border">
            Worker
          </TabsTrigger>
          <TabsTrigger value="provider" className="data-[state=active]:border">
            Provider
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="worker"
          className=" shadow-xl border rounded-md bg-white"
        >
          <h1 className="font-normal text-xl px-10 pt-5">Worker Profile</h1>
          <p className="px-10 py-2 text-sm text-gray-400">
            Fill out the details. Click sign up when you're done.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitWorker)}
              className=" p-10 grid grid-cols-2 gap-10"
            >
              <FormField
                control={form.control}
                name="name"
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
                name="email"
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
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="mt-1 font-normal">
                        Experience
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter your job experience in years"
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
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="mt-1 font-normal">Skills</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Ex.Welding,Carpentry,Bricklaying"
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
                name="walletAddress"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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
        </TabsContent>

        {/* provider tab */}
        <TabsContent
          value="provider"
          className=" shadow-md rounded-md bg-white border"
        >
          <h1 className="font-normal text-xl px-10 pt-5">Provider Profile</h1>
          <p className="px-10 py-2 text-sm text-gray-400">
            Fill out the details. Click sign up when you're done.
          </p>
          <Form {...form2}>
            <form
              onSubmit={form2.handleSubmit(handleSubmitProvider)}
              className=" p-10 space-y-8"
            >
              <FormField
                control={form2.control}
                name="name"
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
                control={form2.control}
                name="email"
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
                control={form2.control}
                name="walletAddress"
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
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default SignUp;
