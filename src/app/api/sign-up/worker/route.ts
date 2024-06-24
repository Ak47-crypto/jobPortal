import dbConnect from "@/lib/dbConnect";
import workerModel from "@/model/user.worker.mode";
export  async function POST(request:Request){
    await dbConnect();
    try {
        const {name,email,experience,skills,walletAddress}=await request.json();
        const isWorkerExist=await workerModel.findOne({
            $or:[
                {email:email},
                {walletAddress:walletAddress}
            ]
        })
        if(isWorkerExist){
            return Response.json({
                success:false,
                message:'user already exist with provided email or walletAddress'
            },{status:400})
        }
        const worker = new workerModel({
            name,
            email,
            experience,
            skills,
            walletAddress
          });
    
          await worker.save();
          return Response.json({
            success:true,
            message:"User saved successfully"
        },{status:201})
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:"Internal server erorr"
        },{status:500})
    }
}