import otpGenerator from "otp-generator";
import OtpModel from "../models/otp.models";
const generateOtp = async (userId: number) => {
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
  const expire = new Date(Date.now() + 5 * 60 * 1000);
  const otpPayload = { userId, otp, expire, otpToken: "" };
  const otpBody = await OtpModel.create(otpPayload);
  return otpBody;
};
export default generateOtp;
