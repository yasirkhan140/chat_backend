import { IRouter, Router } from "express";
import { authMiddleWare } from "../../middleware/auth.middleware";
import { getAllsettings, updateSetting } from "../../controller/settings.controller";
const router: IRouter = Router();
router.get("/user-settings", authMiddleWare,getAllsettings);
router.put("/update-user-settings", authMiddleWare,updateSetting);
export default router;
