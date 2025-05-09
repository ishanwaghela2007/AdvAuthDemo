import nodemailer from 'nodemailer';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any) => {
 try {
    //create a hashed token
  const hashToken=await bcrypt.hash(userId.toString(),10)
   //create a transporter
   if(emailType==="VERIFY"){
    await User.findByIdAndUpdate(userId,
        {
          verifyToken:hashToken,
          verifyTokenExpiry:Date.now()+3600000
        },{
          new:true,
          runValidators:true
        }
       )
   }else if(emailType==="RESET"){
    await User.findByIdAndUpdate(userId,
        {
          forgotPasswordToken:hashToken,
          orgotPasswordTokenExpiry:Date.now()+3600000
        },{
          new:true,
          runValidators:true
        }
       )
   }else{
    throw new Error("Invalid email type")
   }
   const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME!||"",
      pass: process.env.MAILTRAP_SECRET!||""
    }
  });
  const mailOptions = {
     from:'iwaghela05@gmail.com',
     to:email,
     subject:emailType==="VERIFY"?"Verify your email":"Reset your password",
     html:`<p>Click <a href="${process.env.DOMAIN!||""}/verifyEmail?token=${hashToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"}
     or copy and paste the link below in your browser.
     <br> ${process.env.DOMAIN!||""}/verifyEmail?token=${hashToken}
     </p>`
  }
  const mailresponce=await transport.sendMail(mailOptions)
  return mailresponce
 } catch (error:any) {
    throw new Error(error.message)
 }
}
