import dbConnect from "@/lib/dbConnect";
import providerModel from "@/model/user.provider.model";

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
            message:"User updated successfully"
        },{status:200})
    }
    } catch (error) {
        return Response.json({
            success:false,
            message:"Internal server error"
        },{status:500})
    }
    
}