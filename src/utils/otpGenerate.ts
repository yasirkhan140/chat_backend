import otpGenerator from "otp-generator";
import OtpModel from "../models/otp.models";
import { OtpTpyedModel } from "../interface";
import jwt, { Secret } from "jsonwebtoken";
import { mailSender } from "./mailerSender";
import { error } from "console";
const generateToken = (otp: OtpTpyedModel) => {
  return jwt.sign(
    {
      id: otp.id,
    },
    process.env.OTP_TOKEN_SECRET as Secret,
    {
      expiresIn: process.env.OTP_TOKEN_EXPIRY as string,
    }
  );
};

const generateOtp = async (userId: number, userEmail: string) => {
  try {
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OtpModel.findOne({ where: { otp: otp } });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OtpModel.findOne({ where: { otp: otp } });
    }
    const expire = new Date(
      Date.now() + parseInt(process.env.OTP_EXPIRY_MILLI as string)
    );
    const otpPayload = { userId, otp, expire };
    const otpBody = await OtpModel.create(otpPayload);
    const mailSend = await mailSender(
      "Otp from chat application ",
      `thankyou for registering with us 
      your otp is ${otpBody.otp}
      `,
      process.env.MAIL_FROM_ID as string,
      userEmail,
      otpBody
    );
    const token = generateToken(otpBody);

    console.log("mail send successfully", mailSend.messageId);
    const otpFinal = {
      otpToken: token,
      ...otpBody.dataValues,
      otp: undefined,
      userId: undefined,
      deletedAt: undefined,
      updatedAt: undefined,
      id: undefined,
      error: undefined,
    };
    return otpFinal;
  } catch (error) {
    console.error("error in generating otp ", error.message);
    return error;
  }
};
export default generateOtp;
