import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string(),
  email: z.email(),
  phone: z.string(),
  password: z.string().min(6),
  role: z.enum(["CUSTOMER", "TECHNICIAN", "ADMIN"]),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});