import dbConnect from "@/lib/dbConnect";
import workerModel from "@/model/user.worker.mode";
import providerModel from "@/model/user.provider.model";
export  async function POST(request:Request){
    await dbConnect();
    const {walletAddress,jobId}=await request.json();
    const job = await providerModel.findOne({walletAddress})
    
    const matchedJob = job?.job.find((obj) => obj.jobId == jobId);
    // return Response.json({
    //     success:true
    // })
    if (matchedJob) {
        console.log(matchedJob);
        return Response.json({
          success: true,
          data: matchedJob
        });
      } else {
        return Response.json({
          success: false,
          message: "Matching job not found"
        },{status:400});
      }
}