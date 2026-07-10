import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import prisma from "../../config/prisma";
import {
  createBooking,
  getMyBookings,
  getAllBookingsWithFilter,
  assignTechnician,
  getTechnicianBookings,
  updateBookingStatus,
} from "./booking.service";

import {
  createBookingSchema,
  updateBookingStatusSchema,
} from "./booking.validation";

export const createBookingController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const body = createBookingSchema.parse(req.body);

    const customer = await prisma.customer.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer profile not found",
      });
    }

    const booking = await createBooking(customer.id, body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyBookingsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer profile not found",
      });
    }

    const bookings = await getMyBookings(customer.id);

    res.status(200).json({
      success: true,
      message: "My bookings fetched successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllBookingsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;

    const bookings = await getAllBookingsWithFilter(
      page,
      limit,
      status,
      search
    );

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const assignTechnicianController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { bookingId, technicianId } = req.body;

    const booking = await assignTechnician(
      bookingId,
      technicianId
    );

    res.status(200).json({
      success: true,
      message: "Technician assigned successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getTechnicianBookingsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const technician = await prisma.technician.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!technician) {
      return res.status(404).json({
        success: false,
        message: "Technician profile not found",
      });
    }

    const bookings = await getTechnicianBookings(technician.id);

    res.status(200).json({
      success: true,
      message: "Assigned bookings fetched successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateBookingStatusController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { bookingStatus } =
      updateBookingStatusSchema.parse(req.body);

    const bookingId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const booking = await updateBookingStatus(
      bookingId,
      bookingStatus
    );

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};