import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { ConversationParticipantsTpyedModel } from "../interface";
import User from "./user.models";
import ConversationModel from "./conversation.model";

const ConversationParticipantsModel =
  sequelize.define<ConversationParticipantsTpyedModel>(
    "ConversationParticipants",
    {
      // Model attributes are defined here
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: ConversationModel,
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      secondUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      modelName: "ConversationParticipants",
    }
  );
  ConversationParticipantsModel.belongsTo(ConversationModel, {
    foreignKey: 'conversationId',
    as: 'conversation'
  });
export default ConversationParticipantsModel;
