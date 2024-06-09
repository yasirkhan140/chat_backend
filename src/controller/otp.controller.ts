import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import OtpModel from "../models/otp.models";
import { OtpTpyedModel } from "../interface";
import User from "../models/user.models";
import { asyncHandler } from "../utils/asynHandler";
import { ApiResponse } from "../utils/ApiResponse";
interface DecodedToken {
  id: number | undefined;
}
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const token: string | undefined =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
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
  return res
    .status(200)
    .json(new ApiResponse(200, findOtp, "Otp verified successfully"));
});
