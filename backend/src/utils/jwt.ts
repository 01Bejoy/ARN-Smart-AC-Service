import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "arn-smart-ac-service-secret";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d" as any,
  });
};