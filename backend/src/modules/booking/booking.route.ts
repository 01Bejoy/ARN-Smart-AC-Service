import { Router } from "express";
import {
  createBookingController,
  getMyBookingsController,
  getAllBookingsController,
  assignTechnicianController,
  getTechnicianBookingsController,
  updateBookingStatusController,
} from "./booking.controller";
import { verifyToken } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize";

const router = Router();

router.post(
  "/",
  verifyToken,
  authorize("CUSTOMER"),
  createBookingController
);
router.get(
  "/my",
  verifyToken,
  authorize("CUSTOMER"),
  getMyBookingsController
);
router.get(
  "/all",
  verifyToken,
  authorize("ADMIN"),
  getAllBookingsController
);
router.patch(
  "/assign",
  verifyToken,
  authorize("ADMIN"),
  assignTechnicianController
);

router.get(
  "/technician",
  verifyToken,
  authorize("TECHNICIAN"),
  getTechnicianBookingsController
);
router.patch(
  "/:id/status",
  verifyToken,
  authorize("TECHNICIAN"),
  updateBookingStatusController
);
export default router;