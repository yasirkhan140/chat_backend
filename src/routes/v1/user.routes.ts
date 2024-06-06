import { IRouter, Router, RouterOptions } from "express";
import { createUser, getAllUser } from "../../controller/user.controller";

const router: IRouter = Router();
router.get("/user", getAllUser);
router.post("/register", createUser);
router.post("/login");
export default router;
