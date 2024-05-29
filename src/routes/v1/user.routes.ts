import { Router } from "express";
import { getAllUser } from "../../controller/user.controller.js";

const router = Router();
router.get("/user", getAllUser);
export default router;
