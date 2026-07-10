import { Request, Response } from "express";
import { createPayment } from "./payment.service";

export const createPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const body = req.body;

    const payment = await createPayment(body);

    res.status(201).json({
      success: true,
      message: "Payment completed successfully",
      data: payment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};