import prisma from "../../config/prisma";

export const createBooking = async (
  customerId: string,
  data: any
) => {
  const db = prisma as any;

  return db.booking.create({
    data: {
      customerId,
      serviceType: data.serviceType,
      acBrand: data.acBrand,
      acModel: data.acModel,
      problemDescription: data.problemDescription,
      preferredDate: new Date(data.preferredDate),
    },
  });
};
export const getMyBookings = async (customerId: string) => {
  const db = prisma as any;

  return db.booking.findMany({
    where: {
      customerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const getAllBookings = async () => {
  const db = prisma as any;

  return db.booking.findMany({
    include: {
      customer: {
        include: {
          user: true,
        },
      },
      technician: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const assignTechnician = async (
  bookingId: string,
  technicianId: string
) => {
  const db = prisma as any;

  return db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      technicianId,
      bookingStatus: "ASSIGNED",
    },
  });
};
export const getTechnicianBookings = async (technicianId: string) => {
  const db = prisma as any;

  return db.booking.findMany({
    where: {
      technicianId,
    },
    include: {
      customer: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const updateBookingStatus = async (
  bookingId: string,
  bookingStatus: "IN_PROGRESS" | "COMPLETED"
) => {
  const db = prisma as any;

  return db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      bookingStatus,
    },
  });
};
export const getAllBookingsWithFilter = async (
  page: number,
  limit: number,
  status?: string,
  search?: string
) => {
  const db = prisma as any;

  const skip = (page - 1) * limit;

  return db.booking.findMany({
    where: {
      ...(status && { bookingStatus: status }),
      ...(search && {
        OR: [
          {
            acBrand: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            serviceType: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
};