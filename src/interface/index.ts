import { Request } from "express";
import { Model, Optional } from "sequelize";
interface UserAttributes {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  isVerified?: Boolean;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  profileImg?: string;
  coverImage?: string;
  location?: string;
  lastSeen?:Date;
}
interface OtpAttributes {
  id: number;
  otp: number | string;
  userId: number;
  expire?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface ConversationAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  deletedFrom?:Array<number>
  title:string|null
  isGroup: boolean;
}
interface ConversationParticipantsnAttributes {
  id: number;
  conversationId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface ConversationMessageAttributes {
  id?: number;
  conversationId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface MessageAttributes {
  id: number;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  time: Date;
  senderId: number;
  isRead?: boolean;
  send?: boolean;
  receive?: boolean;
  conversationId:number;
  attachment?:string;
  delete?:Array<number>
}
interface BookMarkAttributeTypes {
  id: number;
  icon: string;
  title: string;
  desc: string;
  userId:number;
  conversationId:number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
enum DisplayStatus {
  "everyone",
  "selected",
  "nobody",
}
enum Status {
  "Active",
  "Away",
  "Do not disturb",
}
interface SettingAttributesTypes {
  id: number;
  userId:number;
  themeColor?: string;
  themeImage?: string;
  displayprofilePhoto?: string;
  displayLastSeen?: boolean;
  displayStatus?: DisplayStatus;
  readReceipts?: boolean;
  displayGroups?: DisplayStatus;
  status?: Status
  securityNotification?: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

interface NotificationAttribute {
  id: number;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  userId:number;
  isRead: boolean;
}


interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface OtpCreationAttributes extends Optional<OtpAttributes, "id"> {}

interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> {}

interface ConversationMessageCreationAttributes
  extends Optional<ConversationMessageAttributes, "id"> {}

interface ConversationCreationAttributes
  extends Optional<ConversationAttributes, "id"> {}

interface ConversationParticipantsCreationAttributes
  extends Optional<ConversationParticipantsnAttributes, "id"> {}

interface BookMarkCreationAttributes
  extends Optional<BookMarkAttributeTypes, "id"> {}

  interface SettingCreationAttributes extends Optional<SettingAttributesTypes, "id"> {}

export interface UserTpyedModel
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export interface OtpTpyedModel
  extends Model<OtpAttributes, OtpCreationAttributes>,
    OtpAttributes {}

export interface ConversationTpyedModel
  extends Model<ConversationAttributes, ConversationCreationAttributes>,
    ConversationAttributes {}

export interface ConversationParticipantsTpyedModel
  extends Model<
      ConversationParticipantsnAttributes,
      ConversationParticipantsCreationAttributes
    >,
    ConversationParticipantsnAttributes {}

export interface MessageTpyedModel
  extends Model<MessageAttributes, MessageCreationAttributes>,
    MessageAttributes {}

    export interface NotificationTypedModel
    extends Model<NotificationAttribute, MessageCreationAttributes>,
      MessageAttributes {}

export interface ConversationMessageTpyedModel
  extends Model<
      ConversationMessageAttributes,
      ConversationMessageCreationAttributes
    >,
    ConversationMessageAttributes {}

export interface BookMarkTypedModel
  extends Model<BookMarkAttributeTypes, BookMarkCreationAttributes>,
    BookMarkAttributeTypes {}

    export interface SettingTypedModel
  extends Model<SettingAttributesTypes, SettingCreationAttributes>,
  SettingAttributesTypes {}

export interface IRequest extends Request {
  user: UserTpyedModel;
}

export interface DecodedToken {
  id: number;
}
