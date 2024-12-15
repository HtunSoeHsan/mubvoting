import { prisma } from "@/config/db";

export const getTotalVotes = async () => {
  return await prisma.voting.count();
};
