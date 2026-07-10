import { z } from "zod";

export const createBookingSchema = z.object({
  serviceType: z.string(),
  acBrand: z.string(),
  acModel: z.string().optional(),
  problemDescription: z.string(),
  preferredDate: z.string(),
});

export const updateBookingStatusSchema = z.object({
  bookingStatus: z.enum([
    "IN_PROGRESS",
    "COMPLETED",
  ]),
});