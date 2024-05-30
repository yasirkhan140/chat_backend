import { IRouter, Router, RouterOptions } from "express";
import { getAllUser } from "../../controller/user.controller.js";

const router: IRouter = Router();
router.get("/user", getAllUser);
export default router;
