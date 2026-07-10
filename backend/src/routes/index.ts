import { Router } from "express";

import authRoutes from "../modules/auth/auth.route";
import bookingRoutes from "../modules/booking/booking.route";
import paymentRoutes from "../modules/payment/payment.route";
import dashboardRoutes from "../modules/dashboard/dashboard.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;