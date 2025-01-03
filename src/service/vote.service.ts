"use server";
import {
  getAllSelections,
  getSelectionById,
  saveVotingCount,
  updateSelectionVote,
} from "@/repository/selection.repo";
import { getUserByEmail, updateUserVoteStatus } from "@/repository/user.repo";
import {
  createVote,
  deleteVote,
  getSelectionVotingCount,
  getTotalVoteCount,
  getUniqueVote,
  getVotes,
  getVotesCountByTypes,
} from "@/repository/vote.repo";
import { VoteType } from "@prisma/client";

import { auth } from "./auth.service";

export const getAllVotes = async () => {
  return await getVotes();
};

const checkUser = async () => {
  const session = await auth();

  if (!session?.user.email) return null;
  console.log(session);

  return await getUserByEmail(session?.user.email);
};

export const getVoteCounts = async () => {
  const votes = await getVotesCountByTypes();

  const new_votes: { count: number; type: string }[] = votes.map((vote) => ({
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

  const user = await checkUser();

  if (!user) return false;

  if (!user.vote_status) return false;

  if (!["KING", "QUEEN", "POPULAR", "INNOCENT"].includes(vote_type)) {
    return false;
  }

  const selection = await getSelectionById(selection_id);

  if (!selection) return false;

  if (!GENDER[selection.gender].includes(vote_type)) {
    return false;
  }

  const isAlreadyVoted = await getUniqueVote(user.id, vote_type);

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

  const userTotalVotes = await getTotalVoteCount(user.id);
  console.log(userTotalVotes);

  console.log(user);
  if (userTotalVotes === 4) {
    await updateUserVoteStatus(user.id);
  }

  //  One Feature left : user already voted

  return true;
};

// devote feature only for dine

export const devote = async ({
  vote_type,
  selection_id,
}: {
  vote_type: VoteType;
  selection_id: number;
}) => {
  console.log("hit");

  const user = await checkUser();

  console.log(user);

  if (!user) return false;

  const userVote = await getUniqueVote(user.id, vote_type);

  await updateUserVoteStatus(user.id, true);

  if (userVote?.selection_id === selection_id) {
    await updateSelectionVote(selection_id, vote_type, false);
    await deleteVote(userVote.id);
  }
};
export const getVotingCount = async () => {
  try {
    // Fetch selections
    const [kingSelections, queenSelections] = await Promise.all([
      getAllSelections("MALE"),
      getAllSelections("FEMALE"),
    ]);

    // Fetch votes concurrently
    const kingVotes = await Promise.all(
      kingSelections.map(async(selection) => ({id: selection.id, name: selection.name, no: selection.selection_no, count: await getSelectionVotingCount(selection.id, "KING")}))
    );
    const queenVotes = await Promise.all(
      queenSelections.map(async(selection) => ({id: selection.id, name: selection.name, no: selection.selection_no, count: await getSelectionVotingCount(selection.id, "QUEEN")}))
    );
    const popularVotes = await Promise.all(
      kingSelections.map(async(selection) => ({id: selection.id, name: selection.name, no: selection.selection_no, count: await getSelectionVotingCount(selection.id, "POPULAR")}))
    );
    const innocentVotes = await Promise.all(
      queenSelections.map(async(selection) => ({id: selection.id, name: selection.name, no: selection.selection_no, count: await getSelectionVotingCount(selection.id, "INNOCENT")}))
    );

    // Return structured results
    return {
      kingVotes:kingVotes.sort((a, b) => b.count - a.count),
      queenVotes : queenVotes.sort((a, b) => b.count - a.count),
      popularVotes : popularVotes.sort((a, b) => b.count - a.count),
      innocentVotes : innocentVotes.sort((a, b) => b.count - a.count),
    };
  } catch (error) {
    console.error("Error fetching voting counts:", error);
    throw error;
  }
};
export const collectVoting = async () => {
  try {
    
  const { kingVotes, queenVotes, popularVotes, innocentVotes } = await getVotingCount();

  // Save voting counts for each category
  await Promise.all(
    kingVotes.map((k) => saveVotingCount({ king: k.count }, k.id)) // Ensure all saveVotingCount calls are awaited
  );

  await Promise.all(
    queenVotes.map((q) => saveVotingCount({ queen: q.count }, q.id))
  );

  await Promise.all(
    popularVotes.map((p) => saveVotingCount({ popular: p.count }, p.id))
  );

  await Promise.all(
    innocentVotes.map((i) => saveVotingCount({ innocent: i.count }, i.id))
  );
  } catch (error) {
    
    console.error("Error collecting voting counts:", error);
    throw error;
  }
};