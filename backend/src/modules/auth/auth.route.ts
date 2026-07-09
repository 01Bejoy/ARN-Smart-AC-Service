import { Router } from "express";
import { login, register, profile, adminDashboard } from "./auth.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", verifyToken, profile);

export default router;
router.get(
  "/admin",
  verifyToken,
  authorize("ADMIN"),
  adminDashboard
);
