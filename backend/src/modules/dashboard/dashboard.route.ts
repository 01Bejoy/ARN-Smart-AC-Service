import { Router } from "express";
import { verifyToken } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize";
import { getAdminDashboardController } from "./dashboard.controller";

const router = Router();

router.get(
  "/admin",
  verifyToken,
  authorize("ADMIN"),
  getAdminDashboardController
);

export default router;