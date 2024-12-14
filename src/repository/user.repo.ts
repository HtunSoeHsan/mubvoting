import { prisma } from "@/config/db";
import { UserTypes } from "@/types";

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email: email },
  });
};

export const createUser = async ({ name, email, image }: UserTypes) => {
  if (!name || !email || !image) return false;
  return await prisma.user.create({
    data: { name, email, profile: image, type: "STUDENT" },
  });
};

export const getTotalUsers = async () => {
  return await prisma.user.count();
};

export const getRemaingVoteUsers = async () => {
  return await prisma.user.count({
    where: {
      votes: {
        none: {},
      },
      status: true,
    },
  });
};
