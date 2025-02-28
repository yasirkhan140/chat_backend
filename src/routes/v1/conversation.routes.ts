import { IRouter, Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import {
  createConversation,
  getAllConversation,
  getUserConversation,
} from "../../controller/conversation.controller";
import { allMessageDelete, deleteMessage, getallMessage, readMessage, sendMessage } from "../../controller/message.controller";

const router: IRouter = Router();

router.post("/create-conversation", authMiddleWare, createConversation);
router.get("/get-all-conversation", authMiddleWare, getAllConversation);
router.get("/get-user-conversation/:id", authMiddleWare, getUserConversation);
router.delete("/delete-conversation/:id",authMiddleWare,);
router.put("/read-conversation",authMiddleWare,readMessage);
router.post("/send-message",authMiddleWare,sendMessage);
router.get("/get-messages/:conversationId",authMiddleWare,getallMessage);
// delete single message
router.delete("/delete-message/:messageId",authMiddleWare,deleteMessage);
// delelete multiple message
router.delete("/delete-user-messages/:conversationId",authMiddleWare,allMessageDelete);
// router.delete("/user-delete-img/:messageId",authMiddleWare);
export default router;
// chats
export const GET_FAVOURITES = "/get-favourites";
export const GET_DIRECT_MESSAGES = "/get-direct-messages";
export const GET_CHANNELS = "/get-channles";
export const CREATE_CHANNEL = "/create-channel";
export const GET_CHAT_USER_DETAILS = "/get-user-details";
export const FORWARD_MESSAGE = "/forward-message";
export const TOGGLE_FAVOURITE_CONTACT = "/toggle-favourite-contact";
export const GET_ARCHIVE_CONTACT = "/get-archive-contacts";
export const TOGGLE_ARCHIVE_CONTACT = "/toggle-archive-contact";
