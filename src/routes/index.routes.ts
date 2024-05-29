import { Router } from "express";
import routerV1 from "./v1/index.route.js";
const router = Router();

router.use("/api", routerV1);

export default router;
