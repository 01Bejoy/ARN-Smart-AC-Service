import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  phone: z.string(),
  password: z.string().min(6),
  role: z.enum(["CUSTOMER", "TECHNICIAN", "ADMIN"]),

  address: z.string().optional(),
  city: z.string().optional(),

  experience: z.number().optional(),
  specialty: z.string().optional(),
});