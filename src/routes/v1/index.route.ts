import { IRouter, Response, Router } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import userRoutes from "./user.routes";
const router: IRouter = Router();
// health route for check sevrer running status.
router.get("/health", (_, res: Response) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "server run properly",
        "successfully check the health of server"
      )
    );
});
// routes for v1 api
router.use("/v1", userRoutes);
export default router;
