import { IRouter, Router, RouterOptions } from "express";
import { createUser, getAllUser } from "../../controller/user.controller.js";

const router: IRouter = Router();
router.get("/user", getAllUser);
router.post("/user", createUser);
export default router;
