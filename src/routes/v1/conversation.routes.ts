import { IRouter, Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { createConversation, getAllConversation } from "../../controller/conversation.controller";



const router: IRouter = Router();

router.post("/create-conversation",authMiddleWare,createConversation);
router.get("/get-all-conversation",authMiddleWare,getAllConversation);
router.delete("/delete-conversation/:id");
export default router;
