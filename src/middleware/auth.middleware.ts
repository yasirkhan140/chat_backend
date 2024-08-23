import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.models";
import { asyncHandler } from "../utils/asynHandler";
import { DecodedToken, IRequest } from "../interface";


export const authMiddleWare = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const token: string | undefined =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return res
          .status(401)
          .json(
            new ApiError(
              401,
              "User is not authorized ",
              "token is not valid or token is not send"
            )
          );
      }
      const decodedToken: string | JwtPayload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as DecodedToken;

      const user = await User.findByPk(decodedToken.id);
      if (!user) {
        return res
          .status(401)
          .json(
            new ApiError(401, "user not authorized", "token or user is invalid")
          );
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, error?.message, "Invalid access token"));
    }
  }
);
