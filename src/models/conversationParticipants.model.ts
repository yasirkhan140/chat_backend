import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { ConversationParticipantsTpyedModel } from "../interface";
import { User } from "./associations"; 
import { ConversationModel } from "./associations";

const ConversationParticipantsModel =
  sequelize.define<ConversationParticipantsTpyedModel>(
    "ConversationParticipants",
    {
      // Model attributes are defined here
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      modelName: "ConversationParticipants",
    }
  );

export  {ConversationParticipantsModel};
