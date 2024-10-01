import { Response } from "express";
import { IRequest } from "../interface";
import SettingModel from "../models/setting.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asynHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getAllsettings = asyncHandler(
  async (req: IRequest, res: Response) => {
    const user = req.user;
    const settings = await SettingModel.findOne({
      where: { id: user.settings },
      attributes: { exclude: [""] },
    });
    if (settings) {
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
    return res
      .status(200)
      .json(new ApiResponse(200, settings, "settings fetch successfully"));
  }
);

export const updateSetting = asyncHandler(
  async (req: IRequest, res: Response) => {
    return res
      .status(200)
      .json(new ApiResponse(200, "we are working on it ", "model is working"));
  }
);
