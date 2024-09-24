import { IRouter, Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import {
  createConversation,
  getAllConversation,
  getUserConversation,
} from "../../controller/conversation.controller";

const router: IRouter = Router();

router.post("/create-conversation", authMiddleWare, createConversation);
router.get("/get-all-conversation", authMiddleWare, getAllConversation);
router.get("/get-user-conversations/:id", authMiddleWare, getUserConversation);
router.delete("/delete-conversation/:id");
export default router;
// chats
export const GET_FAVOURITES = "/get-favourites";
export const GET_DIRECT_MESSAGES = "/get-direct-messages";
export const GET_CHANNELS = "/get-channles";
// export const ADD_CONTACTS = "/add-contact";
export const CREATE_CHANNEL = "/create-channel";
export const GET_CHAT_USER_DETAILS = "/get-user-details";
export const GET_CHAT_USER_CONVERSATIONS = "/get-user-conversations";
export const SEND_MESSAGE = "/send-message";
export const RECEIVE_MESSAGE = "/receive-message";
export const READ_MESSAGE = "/read-message";
export const RECEIVE_MESSAGE_FROM_USER = "/receive-message-from-user";
export const DELETE_MESSAGE = "/delete-message";
export const FORWARD_MESSAGE = "/forward-message";
export const DELETE_USER_MESSAGES = "/delete-user-messages";
export const TOGGLE_FAVOURITE_CONTACT = "/toggle-favourite-contact";
export const GET_ARCHIVE_CONTACT = "/get-archive-contacts";
export const TOGGLE_ARCHIVE_CONTACT = "/toggle-archive-contact";
export const READ_CONVERSATION = "/read-conversation";
export const DELETE_IMAGE = "/user-delete-img";
