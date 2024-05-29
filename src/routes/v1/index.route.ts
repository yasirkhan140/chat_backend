import { Request, Response, Router } from "express";
import { ApiResponse } from "../../utils/ApiResponse.js";

const router = Router();
router.get("/health", (req: Request, res: Response) => {
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
export default router;
