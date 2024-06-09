import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import User, {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { IRequest, UserTpyedModel } from "../interface";
import generateOtp from "../utils/otpGenerate";

// genertae acces token and refresh  token
const generateAccessAndRefereshTokens = async (userId: number) => {
  try {
    const findUser: UserTpyedModel | null = await User.findByPk(userId);
    if (findUser) {
      const accessToken = generateAccessToken(
        findUser.id,
        findUser.email,
        findUser.firstName + findUser.lastName
      );
      const refreshToken = generateRefreshToken(findUser.id);

      findUser.refreshToken = refreshToken;
      await findUser.save();

      return { accessToken, refreshToken, findUser };
    }
    throw new Error(
      "Something went wrong while generating referesh and access token"
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
      "refresh token is not generated"
    );
  }
};

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
          "Email is extists please login or enter a new email"
        )
      );
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  //create user then generate otp and send a mail

  const user = await User.create({ firstName, lastName, email, password });
  const otp = await generateOtp(user.id, user.email);
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

  return res
    .status(201)
    .cookie("otpToken", otp.otpToken, options)
    .cookie("verifyUser", otp, options)
    .json(new ApiResponse(201, { user, otp }, "user created successfully"));
});
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  if ([email, password].some((feild) => !feild || feild === "")) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Email and password is required ",
          "some feild is not send"
        )
      );
  }
  const user = await User.scope("withPassword").findOne({ where: { email } });
  if (!user) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Email and password are invalid ",
          "enter a valid email and password"
        )
      );
  }
  const passwordCorrect = await verifyPassword(password, user.password);
  if (!passwordCorrect) {
    return res
      .status(400)
      .json(
        new ApiError(
          401,
          "Email and password are invalid ",
          "Enter a valid email and password"
        )
      );
  }
  const { refreshToken, accessToken, findUser } =
    await generateAccessAndRefereshTokens(user.id);
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { ...findUser.dataValues, accessToken },
        "User login successfully"
      )
    );
});

export const getUser = asyncHandler(async (req: IRequest, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiError(401, "User not found", "invalid token or user"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "user get successfully"));
});

export const updateUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
});
