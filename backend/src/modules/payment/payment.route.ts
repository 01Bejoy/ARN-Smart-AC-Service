import { Router } from "express";
import { createPaymentController } from "./payment.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorize("CUSTOMER"),
  createPaymentController
);

export default router;