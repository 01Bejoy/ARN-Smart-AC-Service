import bcrypt from "bcrypt";
import prisma from "../../config/prisma";

export const registerUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: data.role,
    },
  });

  if (user.role === "CUSTOMER") {
    await prisma.customer.create({
      data: {
        userId: user.id,
        address: data.address || "",
        city: data.city || "",
      },
    });
  }

  if (user.role === "TECHNICIAN") {
    await prisma.technician.create({
      data: {
        userId: user.id,
        experience: data.experience || 0,
        specialty: data.specialty || "",
      },
    });
  }

  if (user.role === "ADMIN") {
    await prisma.admin.create({
      data: {
        userId: user.id,
      },
    });
  }

  return user;
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};