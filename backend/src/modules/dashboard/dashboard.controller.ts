import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { getAdminDashboard } from "./dashboard.service";

export const getAdminDashboardController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data = await getAdminDashboard();

    res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};