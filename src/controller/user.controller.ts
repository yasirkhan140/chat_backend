import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  if (!users)
    return res
      .status(500)
      .json(
        new ApiError(500, "user not getting ", "error occured in user getting")
      );

  return res
    .status(201)
    .json(new ApiResponse(200, users, "users retervied successfully"));
});
interface UserAttributes {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, password, email }: UserAttributes = req.body;
  if (
    [firstName, email, lastName, password].some((item) => !item || item === "")
  ) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "All feilds are required please send all feilds",
          "all feilds are required "
        )
      );
  }
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Email already exits enter a new email",
          "email is extists in login or enter a new email"
        )
      );
  }
  const user = await User.create({ firstName, lastName, email, password });
  if (!user) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "User not created ",
          "some error occured in user creating"
        )
      );
  }
  // const createdUser = await User.findByPk(user.id);
  return res
    .status(201)
    .json(new ApiResponse(201, user, "user created successfully"));
});
