import { prisma } from "@/config/db";
import { VoteTypes } from "@/types";
import { VoteType } from "@prisma/client";

export const getTotalVotes = async () => {
  return await prisma.voting.count();
};

// user votes
export const getVotes = async () => {
  return await prisma.voting.findMany({
    include: {
      selection: true,
      user: true,
    },
  });
};

export const getUniqueVote = async (user_id: number, vote_type: VoteType) => {
  return await prisma.voting.findFirst({
    where: {
      user_id,
      vote_type,
    },
    include: {
      selection: true
    }
  });
};

export const deleteVote = async (id: number) => {
  return await prisma.voting.delete({
    where: {
      id,
    },
  });
};

export const getVotesCountByTypes = async () => {
  return await prisma.voting.groupBy({
    by: ["vote_type"],
    _count: {
      vote_type: true,
    },
  });
};

export const createVote = async ({
  user_id,
  selection_id,
  vote_type,
  voting_year,
}: VoteTypes) => {
  return await prisma.voting.create({
    data: {
      user_id,
      selection_id,
      vote_type,
      voting_year,
    },
  });
};

export const getTotalVoteCount = async (id: number) => {
  return await prisma.voting.count({
    where: {
      user_id: id,
    },
  });
};
