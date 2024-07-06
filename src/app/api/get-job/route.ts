import dbConnect from "@/lib/dbConnect";
import providerModel from "@/model/user.provider.model";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await dbConnect();
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
  try {
    const user = await providerModel.aggregate([
      { $match: { walletAddress: dataCookie.walletAddress } },
      { $unwind: "$job" },
      { $group: { _id: "$_id", job: { $push: "$job" } } },
    ]).exec();
    console.log(user);
    
    if (!user || user.length === 0) {
      return Response.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, job: user[0].job },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return Response.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}