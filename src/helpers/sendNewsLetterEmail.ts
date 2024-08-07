import { promises } from 'dns';
import { Resend } from 'resend';
import NewsLetterEmail from '../../emails/NewsLetterEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsLetterEmail(
    email:string,
):Promise<{
    success:boolean,
    message:string
}>{
    try {
        // console.log(email,username,verifyCode)
         const res=await resend.emails.send({
            from: 'newsletter.jobportal@askonline.fun',
            to: email,
            subject: 'Job portal newsletter',
            react: NewsLetterEmail({email})
          });
          if(res.data)
        return  {success:true,message:"email sent"}
          else return {success:false,message:"error sending email"}
    } catch (error) {
        console.log("error in sending email",error)
        return  {success:false,message:"error in sending email"}
    }
}