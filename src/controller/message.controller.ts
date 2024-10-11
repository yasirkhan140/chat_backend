import { Response } from "express";
import { IRequest, MessageTpyedModel } from "../interface";
import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/ApiError";
import MessageModel from "../models/message.model";
import { ApiResponse } from "../utils/ApiResponse";

export const deleteMessage = asyncHandler(
  async (req: IRequest, res: Response) => {
    const messageId = req.params.messageId;
    if (!messageId) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Message id required",
            "Message is not send or not get it"
          )
        );
    }
    const message: MessageTpyedModel | null = await MessageModel.findByPk(
      messageId
    );
    if (!message) {
      return res
        .status(402)
        .json(new ApiError(402, "message not found", "send wrong id or not"));
    }
    message.destroy();
    message.save();
    return res
      .status(200)
      .json(new ApiResponse(200, message, "Messaage delted successfully"));
  }
);

export const allMessageDelete=asyncHandler(async(req:IRequest,res:Response)=>{
  return res.status(200).json(new ApiResponse(200,"working on it ","controller working on it"))
}) 