import { VoteType } from "@prisma/client";

export interface EmailTypes {
  receiver: string;
  subject: string;
  html: string;
}

export interface UserTypes {
  email: string;
  name: string;
  password?: string;
  image: string;
}

export interface VoteTypes {
  user_id: number;
  selection_id: number;
  vote_type: VoteType;
  voting_year?: string;
}
