import { prisma } from "@/config/db";

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email: email },
  });
};
