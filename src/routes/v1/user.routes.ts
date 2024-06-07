import { IRouter, Router, RouterOptions } from "express";
import {
  createUser,
  getAllUser,
  loginUser,
} from "../../controller/user.controller";
import { authMiddleWare } from "../../middleware/auth.middleware";

const router: IRouter = Router();
router.get("/user", authMiddleWare, getAllUser);
router.post("/register", createUser);
router.post("/login", loginUser);
export default router;
