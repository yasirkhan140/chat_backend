import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll();
  if (!users)
    return res
      .status(500)
      .json(
        new ApiError(500, "user not created ", "error occured in user creating")
      );

  return res
    .status(201)
    .json(new ApiResponse(200, users, "user created successfully"));
});
