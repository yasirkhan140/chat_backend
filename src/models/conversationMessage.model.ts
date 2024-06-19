import { DataTypes } from "sequelize";
import ConversationModel from "./conversation.model";
import MessageModel from "./message.model";
import { sequelize } from "../db/db";
import { ConversationMessageTpyedModel } from "../interface";

const ConversationMessagesModel =
  sequelize.define<ConversationMessageTpyedModel>(
    "ConversationMessages",
    {
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: ConversationModel,
          key: "id",
        },
      },
      messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: MessageModel,
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      modelName: "ConversationMessages",
    }
  );
export default ConversationMessagesModel;
