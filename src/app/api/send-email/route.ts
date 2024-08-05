import { sendNewsLetterEmail } from "@/helpers/sendNewsLetterEmail";
export async function POST(request: Request) {
    const {email}=await request.json();
    try {
        const response=await sendNewsLetterEmail(email)
        if(response.success==true){
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