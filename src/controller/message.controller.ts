import { Response } from "express";
import { IRequest, MessageTpyedModel } from "../interface";
import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/ApiError";
import { MessageModel } from "../models/associations";
import { ApiResponse } from "../utils/ApiResponse";

export const sendMessage = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { conversationId, message, attachment } = req.body;
    const user = req.user;
    if (!conversationId || !message) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "conversationId and message required",
            "conversationId and message is compulsory"
          )
        );
    }
    const newMessage: MessageTpyedModel = await MessageModel.create({
      conversationId,
      message,
      senderId: user.id,
      attachment: attachment || null,
      time: new Date(),
    });
    if(!newMessage){
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "message not send",
            "message not send"
          )
        );
    }
    newMessage.send=true;
    newMessage.save();
    return res
      .status(200)
      .json(new ApiResponse(200, newMessage, "Message sent successfully"));
  }
);
export const readMessage = asyncHandler(
  async (req: IRequest, res: Response) => {
    const {messageIds}:{messageIds: Array<number>} = req.body;
    if (messageIds.length>0) {
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
    const messages: Array<MessageTpyedModel>| null = await MessageModel.findAll({
      where:{
      id:messageIds
    }
  });
    if (!messages) {
      return res
        .status(402)
        .json(new ApiError(402, "message not found", "send wrong id or not"));
    }
    messages.forEach((message)=>{
      message.isRead=true;
      message.save();
    });
    return res
      .status(200)
      .json(new ApiResponse(200, messages, "Message read successfully"));
  });
export const getallMessage = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { conversationId } = req.params;
    if (!conversationId) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Conversation id required",
            "Conversation is not send or not get it"
          )
        );
    }
    const messages: MessageTpyedModel[] = await MessageModel.findAll({
      where: {
        conversationId,
      },
      order: [["time", "ASC"]],
    });
    if (!messages) {
      return res
        .status(404)
        .json(new ApiError(404, "Messages not found", "send wrong id or not"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, messages, "Messages fetched successfully"));
  }
);

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

export const allMessageDelete = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { conversationId } = req.params;
    if (!conversationId) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Conversation id required",
            "Conversation is not send or not get it"
          )
        );
    }
    const messages: MessageTpyedModel[] = await MessageModel.findAll({
      where: {
        conversationId,
      },
    });
    if (!messages) {
      return res
        .status(404)
        .json(new ApiError(404, "Messages not found", "send wrong id or not"));
    }
    // messages.forEach((message) => {
    //   message.destroy();
    //   message.save();
    // });
    return res
      .status(200)
      .json(new ApiResponse(200, "messages", "Messages delted successfully"));
   
  }
);
