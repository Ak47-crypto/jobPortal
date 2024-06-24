import dbConnect from "@/lib/dbConnect";
import providerModel from "@/model/user.provider.model";
export  async function POST(request:Request){
    await dbConnect();
    try {
        const {name,email,walletAddress}=await request.json();
        const isProviderExist=await providerModel.findOne({
            $or:[
                {email:email},
                {walletAddress:walletAddress}
            ]
        })
        if(isProviderExist){
            return Response.json({
                success:false,
                message:'user already exist with provided email or walletAddress'
            },{status:400})
        }
        const provider = new providerModel({
            name,
            email,
            walletAddress
          });
    
          await provider.save();
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