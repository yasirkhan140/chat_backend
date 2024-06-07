import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import User, {
  UserTpyedModel,
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

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
