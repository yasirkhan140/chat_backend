import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import {
  ConversationParticipantsTpyedModel,
  ConversationTpyedModel,
  IRequest,
  UserTpyedModel,
} from "../interface";
import { ApiError } from "../utils/ApiError";
import {
  ConversationModel,
  User,
  ConversationParticipantsModel,
} from "../models/associations";

import { ApiResponse } from "../utils/ApiResponse";

import { Op } from "sequelize";
//create conversation
export const createConversation = asyncHandler(
  async (req: IRequest, res: Response) => {
    const {
      secondUserId,
      isGroup,
      groupTitle,
    }: {
      secondUserId: Array<number> | null;
      isGroup: boolean | null;
      groupTitle: string | null;
    } = req.body;
    const user = req.user;
    if (!secondUserId) {
      return res
        .status(401)
        .json(
          new ApiError(401, "users/user id is required", "id is compulsory")
        );
    }
    const usersExist = await User.findAll({
      where: {
        id: secondUserId, // Find all users with these IDs
      },
    });
    const foundUserIds = usersExist.map((user) => user.id); // Extract found user IDs
    // Compare found users with requested users
    const missingUsers = secondUserId.filter(
      (id) => !foundUserIds.includes(id)
    );
    if (missingUsers.length > 0) {
      return res
        .status(404)
        .json(
          new ApiError(
            404,
            `Users not found: ${missingUsers.join(", ")}`,
            "Some users do not exist"
          )
        );
    }
    // const samuser = secondUserId.filter(
    //   (id) => user.id===id);
    // if (samuser.length > 0) {
    //   return res
    //     .status(401)
    //     .json(
    //       new ApiError(
    //         401,
    //         "Smame user id is not allowed",
    //         "Same user id is not allowed"
    //       )
    //     );
    // }
    const existingConversation: ConversationTpyedModel | null =
      await ConversationModel.findOne({
        include: {
          model: ConversationParticipantsModel,
          where: {
            userId: secondUserId,
          },
          include: [
            {
              model: User, // Include user details
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        },
      });
    if (existingConversation) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            existingConversation,
            "conversation is already exits"
          )
        );
    }
    const conversationCreate: ConversationTpyedModel | null =
      await ConversationModel.create({
        isGroup: isGroup || false,
        title: isGroup ? groupTitle : "null",
      });
    if (!conversationCreate) {
      return res
        .status(500)
        .json(
          new ApiError(500, "some error occured.", "conversation create error")
        );
    }
    const participants = [user.id, ...secondUserId].map((id) => ({
      userId: id,
      conversationId: conversationCreate.id,
    }));
    const conversationParcipants: Array<ConversationParticipantsTpyedModel> | null =
      await ConversationParticipantsModel.bulkCreate(participants);
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
    // const converstion: ConversationParticipantsTpyedModel | null =
    //   await ConversationParticipantsModel.findOne({
    //     where: { id: conversationParcipants.id },
    //     include: { model: ConversationModel, as: "conversation" },
    //   });
    // if (!converstion) {
    //   return res
    //     .status(500)
    //     .json(
    //       new ApiError(
    //         500,
    //         "some error occured",
    //         "error occured in conversation participants fetch"
    //       )
    //     );
    // }
    const allConversations = await ConversationModel.findByPk(
      conversationCreate.id,
      {
        include: {
          model: ConversationParticipantsModel,
          include: [
            {
              model: User, // Include user details
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        },
      }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          allConversations,
          "conversation created successfully"
        )
      );
  }
);

// get all conversation
export const getAllConversation = asyncHandler(
  async (req: IRequest, res: Response) => {
    const user = req.user;
    const allConversation = await ConversationModel.findAll({
      include: [
        {
          model: ConversationParticipantsModel,
          where: { userId: user.id },
          attributes: [], // Exclude pivot table fields
        },
        {
          model: User,
          as: "participants",
          attributes: ["firstName", "lastName", "id"],
          through: { attributes: [] }, // Exclude join table attributes
        },
      ],
    });
    if (!allConversation) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "no conversation found",
            "You dont have any conversation"
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
//resolve this issue
// get user conversation
export const getUserConversation = asyncHandler(
  async (req: IRequest, res: Response) => {
    const id = req.params.id;
    const allConversation = await ConversationModel.findOne({
        where: {id},
        include: {
          model: ConversationParticipantsModel,
          include: [
            {
              model: User, // Include user details
              attributes: ["id", "firstName", "lastName","email"],
            },
          ],
        },
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
