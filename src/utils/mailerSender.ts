import nodemailer from "nodemailer";
import HTML_TEMPLATE from "./mailtemplate";
import { OtpTpyedModel } from "../interface";
export const mailSender = async (
  subject: string,
  message: string,
  from: string,
  to: string,
  otpBody: OtpTpyedModel
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const options = {
      from: from, // sender address
      to: to,
      subject: subject, // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };

    const info = await transporter.sendMail(options);
    return info;
  } catch (error) {
    console.log("error in mail send");
    await otpBody.destroy({ force: true });
    throw error;
  }
};
