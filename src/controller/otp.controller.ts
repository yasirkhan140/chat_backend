import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import OtpModel from "../models/otp.models";
import { IRequest, OtpTpyedModel } from "../interface";
import User from "../models/user.models";
import { asyncHandler } from "../utils/asynHandler";
import { ApiResponse } from "../utils/ApiResponse";
import generateOtp from "../utils/otpGenerate";
interface DecodedToken extends JwtPayload {
  id: number;
}
const options = {
  httpOnly: true,
  secure: true,
};
export const verifyOtp = asyncHandler(async (req: IRequest, res: Response) => {
  const token: string | undefined =
    req.cookies?.accessToken || req.header("otpToken");
  const { otp }: { otp: string } = req.body;
  if (!otp || otp.length === 6) {
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "invalid otp please enter a valid otp",
          "otp is not valid"
        )
      );
  }
  if (!token) {
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "Invalid token or invalid opt",
          "Please enter a valid otp"
        )
      );
  }
  const decodedToken: string | JwtPayload = jwt.verify(
    token,
    process.env.OTP_TOKEN_SECRET as string
  ) as DecodedToken;
  const findOtp: OtpTpyedModel | null = await OtpModel.findByPk(
    decodedToken.id,
    { include: User }
  );
  if (!findOtp) {
    return res
      .status(401)
      .json(new ApiError(401, "invalid token ", "please send a valid token"));
  }
  if (findOtp.otp === otp) {
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "invalid otp please enter a valid otp",
          "otp is not valid"
        )
      );
  }
  const user = req.user;
  user.isVerified = true;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, findOtp, "Otp verified successfully"));
});

export const reGenerateOtp = asyncHandler(
  async (req: IRequest, res: Response) => {
    const user = req.user;
    const token: string | undefined =
      req.cookies?.accessToken || req.header("otpToken");
    const otp = await generateOtp(user.id, user.email);
    if (!otp || otp.message || !otp.otpToken) {
      await user.destroy({ force: true });
      return res
        .status(500)
        .json(new ApiError(500, "some error ocurred in otp generation", otp));
    }
    if (!token) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "Invalid token or invalid opt",
            "Please enter a valid otp"
          )
        );
    }
    let decodedToken: string | JwtPayload = "";
    try {
      decodedToken = jwt.verify(
        token,
        process.env.OTP_TOKEN_SECRET as string
      ) as DecodedToken;
    } catch (error) {
      decodedToken = "";
    }
    let decodedTokenAgain = decodedToken as DecodedToken;
    if (decodedTokenAgain && decodedTokenAgain.id) {
      const findOtp: OtpTpyedModel | null = await OtpModel.findByPk(
        decodedTokenAgain.id,
        { include: User }
      );
    }

    return res
      .status(201)
      .cookie("otpToken", otp.otpToken, options)
      .json(new ApiResponse(201, { user, otp }, "user created successfully"));
  }
);
