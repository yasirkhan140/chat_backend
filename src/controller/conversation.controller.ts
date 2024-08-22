import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import {
  ConversationParticipantsTpyedModel,
  ConversationTpyedModel,
  IRequest,
} from "../interface";
import { ApiError } from "../utils/ApiError";
import ConversationModel from "../models/conversation.model";
import ConversationParticipantsModel from "../models/conversationParticipants.model";
import { ApiResponse } from "../utils/ApiResponse";

export const createConversation = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { secondUserId }: { secondUserId: number | null } = req.body;
    const user = req.user;
    if (!secondUserId) {
      return res
        .status(401)
        .json(
          new ApiError(401, "Second user id is required", "id is compulsory")
        );
    }
    const conversationCreate: ConversationTpyedModel | null =
      await ConversationModel.create();
    if (!conversationCreate) {
      return res
        .status(500)
        .json(
          new ApiError(500, "some error occured.", "conversation create error")
        );
    }
    const conversationParcipants: ConversationParticipantsTpyedModel | null =
      await ConversationParticipantsModel.create({
        userId: user.id,
        secondUserId: secondUserId,
        conversationId: conversationCreate.id,
      });
    if (!conversationParcipants) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "some error occured.",
            "conversation participants create error"
          )
        );
    }
    const converstion: ConversationParticipantsTpyedModel | null =
      await ConversationParticipantsModel.findOne({
        where: { conversationId: conversationParcipants.id },
        include: { model: ConversationModel, as: "conversation" },
      });
    if (!converstion) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "some error occured",
            "error occured in conversation participants fetch"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          converstion,
          "conversation created successfully"
        )
      );
  }
);
