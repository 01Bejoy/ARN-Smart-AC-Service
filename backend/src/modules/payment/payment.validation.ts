import { z } from "zod";

export const createPaymentSchema = z.object({
  bookingId: z.string(),
  amount: z.number(),
  paymentMethod: z.string(),
});