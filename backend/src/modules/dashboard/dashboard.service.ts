import prisma from "../../config/prisma";

const db = prisma as any;

export const getAdminDashboard = async () => {
  const totalUsers = await db.user.count();
  const totalCustomers = await db.customer.count();
  const totalTechnicians = await db.technician.count();

  const totalBookings = await db.booking.count();

  const pendingBookings = await db.booking.count({
    where: { bookingStatus: "PENDING" },
  });

  const assignedBookings = await db.booking.count({
    where: { bookingStatus: "ASSIGNED" },
  });

  const completedBookings = await db.booking.count({
    where: { bookingStatus: "COMPLETED" },
  });

  return {
    totalUsers,
    totalCustomers,
    totalTechnicians,
    totalBookings,
    pendingBookings,
    assignedBookings,
    completedBookings,
  };
};