import { Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import {OtpModel, User} from "../models/associations"
import { IRequest, OtpTpyedModel } from "../interface";
import { generateAccessToken } from "../models/user.models";
import { asyncHandler } from "../utils/asynHandler";
import { ApiResponse } from "../utils/ApiResponse";
import generateOtp from "../utils/otpGenerate";
import { generateAccessAndRefereshTokens } from "./user.controller";
import isWithinTwoMinutes from "../utils/timeCalculate";
interface DecodedToken extends JwtPayload {
  id: number;
}
const options = {
  httpOnly: true,
  secure: true,
};
export const verifyOtp = asyncHandler(async (req: IRequest, res: Response) => {
  const token: string | undefined =
    req.cookies?.otpToken || req.header("otpToken");
  const { otp }: { otp: string } = req.body;
  if (!otp || otp.length !== 6) {
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
          "Invalid token or invalid otp",
          "Please enter a valid otp"
        )
      );
  }
  const decodedToken: string | JwtPayload = jwt.verify(
    token,
    process.env.OTP_TOKEN_SECRET as string
  ) as DecodedToken;
  const findOtp: OtpTpyedModel | null = await OtpModel.findOne({
    where: { id: decodedToken.id, otp },
    include: User,
  });
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
          "Please enter a valid otp",
          "Otp is not valid"
        )
      );
  }
  const user = req.user;
  if (user.id !== findOtp.userId) {
    return res
      .status(401)
      .json(
        new ApiError(401, "invalid user and otp", "please enter a valid otp")
      );
  }
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user.id
  );
  user.isVerified = true;
  await user.save();
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .clearCookie("otpToken")
    .clearCookie("verifyUser")
    .json(new ApiResponse(200,{...findOtp.dataValues,user}, "Otp verified successfully"));
});

export const reGenerateOtp = asyncHandler(
  async (req: IRequest, res: Response) => {
    const user = req.user;
    const token: string | undefined =
      req.cookies?.otpToken || req.header("otpToken");
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
        decodedTokenAgain.id
      );
      if (findOtp) {
        const createTime = findOtp.createdAt as Date;
        const [isWithinTwoMin, time] = isWithinTwoMinutes(createTime);
        if (isWithinTwoMin) {
          return res
            .status(401)
            .json(
              new ApiError(
                401,
                "regneration of failed",
                `please try again after ${time}sec later`
              )
            );
        }
      }
    }
    return res
      .status(201)
      .cookie("otpToken", otp.otpToken, options)
      .json(new ApiResponse(201, { user, otp }, "user created successfully"));
  }
);
