import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import {
  ConversationParticipantsTpyedModel,
  ConversationTpyedModel,
  IRequest,
  UserTpyedModel,
} from "../interface";
import { ApiError } from "../utils/ApiError";
import ConversationModel from "../models/conversation.model";
import ConversationParticipantsModel from "../models/conversationParticipants.model";
import { ApiResponse } from "../utils/ApiResponse";
import User from "../models/user.models";
import { Op } from "sequelize";
//create conversation
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
    const userisExitsorNot: UserTpyedModel | null = await User.findByPk(
      secondUserId
    );
    if (!userisExitsorNot) {
      return res
        .status(401)
        .json(new ApiError(401, "user is not exits", "user/id is not exits"));
    }
    const exitsConversation: ConversationParticipantsTpyedModel | null =
      await ConversationParticipantsModel.findOne({
        where: { userId: user.id, secondUserId: secondUserId },
      });
    if (exitsConversation) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "conversation is already exits",
            "conversation/chat is already created"
          )
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
        where: { id: conversationParcipants.id },
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
        new ApiResponse(200, converstion, "conversation created successfully")
      );
  }
);

// get all conversation
export const getAllConversation = asyncHandler(
  async (req: IRequest, res: Response) => {
    const user = req.user;
    const allConversation = await ConversationParticipantsModel.findAll({
      where: { [Op.or]: [{ userId: user.id }, { secondUserId: user.id }] },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "deletedAt",
              "refreshToken",
              "isVerified",
              "password",
              "email",
            ],
          },
        },
        {
          model: User,
          as: "secondUser",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "deletedAt",
              "refreshToken",
              "isVerified",
              "password",
              "email",
            ],
          },
        },
      ],
    });
    if (!allConversation) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "some error occured",
            "error in fetching conversation"
          )
        );
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          allConversation,
          "conversation/chats fetch successfully"
        )
      );
  }
);
