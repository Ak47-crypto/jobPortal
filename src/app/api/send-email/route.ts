import { sendNewsLetterEmail } from "@/helpers/sendNewsLetterEmail";
import dbConnect from "@/lib/dbConnect";
import newsLetterModel from "@/model/newsLetter.model";
export async function POST(request: Request) {
    await dbConnect();
    const {email}=await request.json();
    try {
        const newsLetterCheck=await newsLetterModel.findOne({email})
        if(newsLetterCheck){
            return Response.json({
                success:false,
                message:"Already subscribed"
            },{status:400})
        }
        const response=await sendNewsLetterEmail(email)
        
        
        if(response.success==true){
            const newsLetterCreate=await newsLetterModel.create({
                email
            })
            return Response.json(response)
        }
        return Response.json(response)
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:"Internal server error"
        },{status:500})
    }
}