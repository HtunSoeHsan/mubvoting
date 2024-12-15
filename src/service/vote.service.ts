import {
  getSelectionById,
  updateSelectionVote,
} from "@/repository/selection.repo";
import { getUserByEmail } from "@/repository/user.repo";
import {
  createVote,
  getUniqueVote,
  getVotes,
  getVotesCountByTypes,
} from "@/repository/vote.repo";
import { VoteType } from "@prisma/client";

import { useSession } from "next-auth/react";
import { auth } from "./auth.service";

export const getAllVotes = async () => {
  return await getVotes();
};

export const getVoteCounts = async () => {
  let votes = await getVotesCountByTypes();

  let new_votes: { count: Number; type: string }[] = votes.map((vote) => ({
    count: vote._count.vote_type,
    type: vote.vote_type,
  }));

  return new_votes;
};

export const postVote = async ({
  selection_id,
  vote_type,
}: {
  selection_id: number;
  vote_type: VoteType;
}) => {
  const GENDER = {
    MALE: ["KING", "POPULAR"],
    FEMALE: ["QUEEN", "INNOCENT"],
  };

  if (!["KING", "QUEEN", "POPULAR", "INNOCENT"].includes(vote_type)) {
    return false;
  }

  const selection = await getSelectionById(selection_id);

  if (!selection) return false;

  if (!GENDER[selection.gender].includes(vote_type)) {
    return false;
  }

  const session = await auth();

  if (!session?.user.email) return false;

  const user = await getUserByEmail(session?.user.email);

  if (!user) return false;

  const isAlreadyVoted = await getUniqueVote(user.id, selection_id, vote_type);

  if (isAlreadyVoted) return false;

  const vote = await createVote({
    user_id: user?.id,
    selection_id,
    vote_type,
    voting_year: "2024",
  });

  if (vote) {
    await updateSelectionVote(selection_id, vote_type);
  }

  //  One Feature left : user already voted

  return true;
};
