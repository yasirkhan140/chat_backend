import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import  {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "../models/user.models";
import { User } from "../models/associations";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { IRequest, UserTpyedModel } from "../interface";
import generateOtp from "../utils/otpGenerate";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import {SettingModel} from "../models/associations";
// genertae acces token and refresh  token
interface IDecodeRefreshToken extends JwtPayload {
  id: number;
}
const options = {
  httpOnly: true,
  secure: true,
};
export const generateAccessAndRefereshTokens = async (userId: number) => {
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
  const users = await User.findAll({
    attributes: {
      exclude: [
        "password",
        "refreshToken",
        "isVerified",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
  });
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
  const existingUser = await User.findOne({
    where: { email },
    paranoid: false,
  });
  if (existingUser) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Email is extists please login or enter a new email",
          "Email is extists please login "
        )
      );
  }

  //create user then generate otp and send a mail
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
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
  const otp = await generateOtp(user.id, user.email);
  if (!otp || otp.message || !otp.otpToken) {
    await user.destroy({ force: true });
    return res
      .status(500)
      .json(new ApiError(500, "some error ocurred in otp generation", otp));
  }
  const userToken = generateAccessToken(user.id, user.email, user.firstName);
  return res
    .status(201)
    .cookie("otpToken", otp.otpToken, options)
    .cookie("verifyUser", userToken, options)
    .json(
      new ApiResponse(
        201,
        { ...user.dataValues, userToken, otp },
        "user created successfully"
      )
    );
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
  const user = await User.findOne({where:{id:req.user.id},include:SettingModel})
  return res
    .status(200)
    .json(new ApiResponse(200, user, "user get successfully"));
});

export const updateUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
});

// generate useraccesstoken
export const generateAccessTokenByRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken =
      req.cookies?.refreshToken || req.header("refreshToken");
    if (!refreshToken) {
      return res
        .status(402)
        .json(
          new ApiError(
            401,
            "token is not valid or token is not send",
            "token is not send please send a token"
          )
        );
    }
    let decodedToken: string | JwtPayload = "";
    try {
      decodedToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as Secret
      ) as IDecodeRefreshToken;
    } catch (error) {
      return res
        .status(402)
        .json(
          new ApiError(
            401,
            "Invalid token or expired token",
            "please send a valid token"
          )
        );
    }
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res
        .status(402)
        .json(
          new ApiError(401, "User not found ", "Invalid token or user deleted")
        );
    }
    const tokenGenerate = generateAccessToken(
      user.id,
      user.email,
      user.firstName
    );
    if (!tokenGenerate) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Error in generating token ",
            "please try again after some time"
          )
        );
    }
    return res
      .status(200)
      .cookie("accessToken", tokenGenerate, options)
      .json(
        new ApiResponse(
          200,
          { ...user.dataValues, accessToken: tokenGenerate },
          "token generate successfully"
        )
      );
  }
);
export const userDetail = asyncHandler(async (req: IRequest, res: Response) => {
  const id = req.params.id;
  const userDetail = await User.findOne({
    where: { id: id },
    attributes: {
      exclude: [
        "password",
        "refreshToken",
        "isVerified",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
  });
  if (!userDetail) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid id or some error", "some error occurs"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, userDetail, "user detail fetch succefully"));
});
export const logoutUser = asyncHandler(async (req: IRequest, res: Response) => {
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(
      new ApiResponse(200, "user logout succesfully", "user get successfully")
    );
});
