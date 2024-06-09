import { IRouter, Router } from "express";
import {
  createUser,
  getAllUser,
  getUser,
  loginUser,
} from "../../controller/user.controller";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { verifyOtp } from "../../controller/otp.controller";

const router: IRouter = Router();
router.get("/users", authMiddleWare, getAllUser);
router.get("/user", authMiddleWare, getUser);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
export default router;
