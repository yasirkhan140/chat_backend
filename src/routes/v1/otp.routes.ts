import { IRouter, Router } from "express";

import { reGenerateOtp, verifyOtp } from "../../controller/otp.controller";
import otpauthMiddleware from "../../middleware/otpauth.middleware";

const router: IRouter = Router();

router.post("/verify-otp", otpauthMiddleware, verifyOtp);
router.get("/regenerate-otp", otpauthMiddleware, reGenerateOtp);
export default router;
