import dbConnect from "@/lib/dbConnect";
import providerModel from "@/model/user.provider.model";
import workerModel from "@/model/user.worker.mode";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { auth0options } from "../auth/[...nextauth]/options";
export async function POST(request:Request){
    const session = await getServerSession(auth0options);
  const _user: User = session?.user;
    if(!session || !_user)
        return Response.json({
            success:false,
            message:'Not authenticated'
        })
    await dbConnect();
    try {
        const {email,role}=await request.json();
        if(role=='worker'){
            const worker=await workerModel.findOneAndDelete({email})
            console.log(worker);
            if(!worker)
                {
                    return Response.json({
                        success:false,
                        message:'User not exist against given details'
                    },{status:400})
                }
            return Response.json({
                success:true,
                message:'User deleted successfully'
            },{status:200})
        }else if(role=='provider'){
            const provider=await providerModel.findOneAndDelete({email})
            if(!provider){
                return Response.json({
                    success:false,
                    message:'User not exist against given details'
                },{status:400})
            }
            return Response.json({
                success:true,
                message:'User deleted successfully'
            },{status:200})
        }
        else
        return Response.json({
            success:false,
            message:'User with this role can not be deleted'
        },{status:400})
    } catch (error) {
        console.log('error occured in delete-user-request route',error)
        return Response.json({
            success:false,
            message:'Internal server error'
        },{status:500})
    }
}