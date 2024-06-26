import dbConnect from "@/lib/dbConnect";
import providerModel from "@/model/user.provider.model";
import workerModel from "@/model/user.worker.mode";

export async function POST(request:Request){
    await dbConnect();
    try {
        const {email,role}=await request.json();
    if(role==='provider'){
        const provider =await providerModel.findOne({email})
        if(!provider){
            return Response.json({
                success:false,
                message:"User not exist"
            },{status:400})
        }
        provider.isVerified=true;
        await provider.save();
        return Response.json({
            success:true,
            message:"Provider updated successfully"
        },{status:200})
    }
    else{
        const worker =await workerModel.findOne({email})
        if(!worker){
            return Response.json({
                success:false,
                message:"User not exist"
            },{status:400})
        }
        worker.isVerified=true;
        await worker.save();
        return Response.json({
            success:true,
            message:"Worker updated successfully"
        },{status:200})
    }
    } catch (error) {
        return Response.json({
            success:false,
            message:"Internal server error"
        },{status:500})
    }
    
}