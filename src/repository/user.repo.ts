import { prisma } from "@/config/db";
import { UserTypes } from "@/types";
import { UserType, VoteType } from "@prisma/client";

export const getUsers = async () => {
  return prisma.user.findMany({take: 10});
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email: email },
    include: {
      votes: true,
    },
  });
};

export const voteds = async (id: number) => {
  const voteTypes: VoteType[] = ['KING', 'QUEEN', 'POPULAR', 'INNOCENT'];
  const votePromises = voteTypes.map((voteType: VoteType) =>
    prisma.voting.findFirst({
      select: {
        selection: {
          select: {
            id: true,
            age: true,
            name: true,
            address: true,
            gender: true,
            profile: true,
            selected: true,
            section: true,
            selection_no: true,
          },
        },
      },
      where: {
        user_id: id,
        vote_type: voteType,
      },
    })
  );

  const [king, queen, popular, innocent] = await Promise.all(votePromises);

  return {
    king,
    queen,
    popular,
    innocent,
  };
};

export const createUser = async ({ name, email, image }: UserTypes) => {
  return await prisma.user.create({
    data: { name, email, type: UserType.STUDENT, profile: image },
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

export const updateUserVoteStatus = async (
  id: number,
  status: boolean = false
) => {
  return await prisma.user.update({
    data: {
      vote_status: status,
    },
    where: {
      id,
    },
  });
};
