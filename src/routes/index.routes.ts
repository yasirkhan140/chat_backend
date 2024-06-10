import { IRouter, Router } from "express";
import routerV1 from "./v1/index.route";
const router: IRouter = Router();

router.use("/api/v1", routerV1);
// router.use("/api", routerV2);

export default router;
