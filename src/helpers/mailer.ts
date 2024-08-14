import nodemailer from 'nodemailer';
import User from '@/models/user.models';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType,userId}:any) => {
    //ham nay email,emailType,text,userId ki type bhi any kar di lakin hamin ya dakh kay type define karni chiay

    
    
    
    try {
      //ya try catch ham nay jo todo baki tha kay send kasay karin gay mail vo bana rahy hain
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);


      if (emailType==="VERIFY") {
          await User.findByIdAndUpdate(userId, {verifyToken: hashedToken,verifyTokenExpiry:Date.now() +3600000}); //ya token ki expiary ban gai   
      }
      else if(emailType==="RESET") {
        await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken,forgotPasswordExpiry:Date.now() +3600000});
      }
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "be3dc237666169",
          pass: "b2a10c6ed928a9"
        }
      });
          

          const mailOption = {
            from: 'ah2797764@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY'? "Verify your Email:":'Reset your Password',
            html: `<p>Click <a href"${process.env.DOMAIN}/verifyemail?token={hashedToken}">Here</a> to ${emailType === 'VERIFY'? "Verify your Email":'Reset your Password'}
            or copy and paste the link below in your browser <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body ya href may ham nay link banaya hay aus may ham nay token aur ak verify page dia hay to varify page abhi bana hoa nahi hay vo bany ga 
          }

          const mailResponse = await transport.sendMail(mailOption);
          return mailResponse;
    } catch (error:any) { //error ko any kar dia vasy karna to nahi chaiay lakin chaly ga
        throw new Error(error.message);
    }
}
