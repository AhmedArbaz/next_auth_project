import nodemailer from 'nodemailer';

export const sendEmail = async ({email, emailType, text,userId}:any) => {
    //ham nay email,emailType,text,userId ki type bhi any kar di lakin hamin ya dakh kay type define karni chiay
        //Todo: configure the mail for usage here 
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOption = {
            from: 'ah2797764@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY'? "Verify your Email:":'Reset your Password',
            html: "<b>Hello world?</b>", // html body
          }

          const mailResponse = await transporter.sendMail(mailOption);
          return mailResponse;
    } catch (error:any) { //error ko any kar dia vasy karna to nahi chaiay lakin chaly ga
        throw new Error(error.message);
    }
}
