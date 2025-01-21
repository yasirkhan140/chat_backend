import { Response } from "express";
import { IRequest } from "../interface";
import {SettingModel} from '../models/associations'
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asynHandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getAllsettings = asyncHandler(
  async (req: IRequest, res: Response) => {
    const user = req.user;
    const settings = await SettingModel.findOne({
      where: { userId: user.id },
      attributes: { exclude: [""] },
    });
    if (!settings) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Settings are not found",
            "error in getting settings "
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
