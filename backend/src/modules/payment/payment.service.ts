import prisma from "../../config/prisma";

export const createPayment = async (data: {
  bookingId: string;
  amount: number;
  paymentMethod: string;
}) => {
  return (prisma as any).payment.create({
    data: {
      bookingId: data.bookingId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      paymentStatus: "PAID",
      transactionId: `TXN-${Date.now()}`,
    },
  });
};