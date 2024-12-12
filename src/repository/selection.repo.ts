import { prisma } from "@/config/db";
export const getTotalSelections = async () => {
  return await prisma.selection.count();
};
