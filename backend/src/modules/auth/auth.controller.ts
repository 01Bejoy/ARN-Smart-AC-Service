import { Request, Response } from "express";
import { registerSchema } from "./auth.validation";
import { registerUser } from "./auth.service";
import bcrypt from "bcrypt";
import { loginSchema } from "./auth.validation";
import { findUserByEmail } from "./auth.service";
import { generateToken } from "../../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await findUserByEmail(data.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
import { AuthRequest } from "../../middleware/auth.middleware";

export const profile = async (
  req: AuthRequest,
  res: Response
) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: req.user,
  });
};
export const adminDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
    user: req.user,
  });
};
