import dbConnect from "@/lib/dbConnect";
import workerModel from "@/model/user.worker.mode";
import providerModel from "@/model/user.provider.model";
import adminModel from "@/model/admin.model";
export  async function GET(request:Request){
    await dbConnect();
    try {
        const workersPipeline = [
          { $match: { isVerified: false } },
          {
            $project: {
              name: 1,
              email: 1,
              walletAddress: 1,
              role:1,
              createdAt:1
            }
          }
        ];
    
        const providersPipeline = [
          { $match: { isVerified: false } },
          {
            $project: {
              name: 1,
              email: 1,
              walletAddress: 1,
              role:1,
              createdAt:1
            }
          }
        ];
    
        const workers = await workerModel.aggregate(workersPipeline);
        const providers = await providerModel.aggregate(providersPipeline);
        // console.log(workers,'in workers');
        
        const users = [...workers, ...providers];
        return Response.json({
            success:true,
            data:users
        },{status:200})
    }catch(err){
        console.log(err)
        return Response.json({
            success:true,
            message:'Internal server error'
        },{status:200})
    }
}

export  async function POST(request:Request){
    await dbConnect();
    try {
        const workersPipeline = [
          
          {
            $project: {
              name: 1,
              email: 1,
              walletAddress: 1,
              role:1,
              createdAt:1
            }
          }
        ];
    
        const providersPipeline = [
          
          {
            $project: {
              name: 1,
              email: 1,
              walletAddress: 1,
              role:1,
              createdAt:1
            }
          }
        ];

        const adminPipeline = [
            
            {
              $project: {
                name:1,
                email: 1,
                walletAddress: 1,
                role:1,
                createdAt:1
              }
            }
          ];
    
        const workers = await workerModel.aggregate(workersPipeline);
        const providers = await providerModel.aggregate(providersPipeline);
        const admins=await adminModel.aggregate(adminPipeline)

        // fetch counts
        const workersCountResult = await workerModel.aggregate([{
            $count: "workerCount"
          }]);
    const providersCountResult = await providerModel.aggregate([{
        $count: "providerCount"
      }]);
    const adminCountResult = await adminModel.aggregate([{
        $count: "adminCount"
    }]);
        // console.log(workers,'in workers');
        const workerCount = workersCountResult[0] ? workersCountResult[0].workerCount : 0;
        const providerCount = providersCountResult[0] ? providersCountResult[0].providerCount : 0;
        const adminCount = adminCountResult[0] ? adminCountResult[0].adminCount : 0;
        const users = [...admins,...workers, ...providers];
        return Response.json({
            success:true,
            data:{users,
            workerCount,
            providerCount,
            adminCount}
        },{status:200})
    }catch(err){
        console.log(err)
        return Response.json({
            success:true,
            message:'Internal server error'
        },{status:200})
    }
}