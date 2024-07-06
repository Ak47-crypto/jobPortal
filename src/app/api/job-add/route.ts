import dbConnect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import providerModel from "@/model/user.provider.model";
import { Job } from "@/model/user.provider.model";
export async function POST(request: NextRequest) {
  // const {provider,jobId,title,location,salary,description,timestamp}=await request.json();
  try{
  const userData = request.cookies.get("userData");

  if (!userData) {
    return Response.json(
      {
        success: false,
        message: "User not logged in as provider",
      },
      { status: 400 }
    );
  }
  const dataCookie = JSON.parse(userData.value as string);
  if (!dataCookie || dataCookie.role != "provider") {
    return Response.json(
      {
        success: false,
        message: "User not logged in as provider",
      },
      { status: 400 }
    );
  }




  
//   const parsedData=JSON.parse(data)
  const { provider, jobId, title, location, salary, description, timestamp } =await request.json();
  const data={
    provider,
    jobId,
    title,
    location,
    salary,
    description,
    timestamp
  }
  await dbConnect();
  
    console.log(data ,"data log")
    const providerUser = await providerModel.findOne({
      walletAddress: provider,
    });
    console.log(providerUser,"provider log");
    
    if (!providerUser) {
      return Response.json(
        {
          success: false,
          message: "provider not exist to save the job",
        },
        { status: 400 }
      );
    }
    if(providerUser.job.some(job=>job.jobId===data.jobId)){
        return Response.json(
            {
              success: false,
              message: "job already exist",
            },
            { status: 400 }
          );
    }
    providerUser.job.push(data as Job);
    await providerUser.save();
    return Response.json(
      {
        success: true,
        message: "job saved successfully for the provider",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
