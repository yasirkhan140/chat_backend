import { IRouter, Router } from "express";
import {
  createUser,
  generateAccessTokenByRequest,
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
router.get("/token", generateAccessTokenByRequest);
export default router;
