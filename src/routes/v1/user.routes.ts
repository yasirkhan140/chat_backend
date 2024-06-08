import { IRouter, Router, RouterOptions } from "express";
import {
  createUser,
  getAllUser,
  getUser,
  loginUser,
} from "../../controller/user.controller";
import { authMiddleWare } from "../../middleware/auth.middleware";

const router: IRouter = Router();
router.get("/users", authMiddleWare, getAllUser);
router.get("/user", authMiddleWare, getUser);
router.post("/register", createUser);
router.post("/login", loginUser);
export default router;
