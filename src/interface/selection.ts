
export interface SelectionPayload {
  id: number;
  name: string;
  profile: string;
  age?: number;
  gender: string;
  section: string;
  selection_no: number;
  king?: number;
  queen?: number;
  popular?: number;
  innocent?: number;
  dob?: Date | null;
  address?: string;
  selection_year?: string;
  selected?: boolean;
  gallery: string[]; // Array of image URLs for the Gallery
}

export interface Gallery {
  id: number;
  image: string;
  selection_id: number;
}

export interface Selection {
  id: string;
  uuid: string;
    name: string;
    profile: string;
    age?: number | null;
    gender: string;
    selection_no: number;
    section: string;
    address?: string | null;
    selected: boolean;
    gallery: string[];
    kingVotesCount: number;
    queenVotesCount: number;
    popularVotesCount: number;
    innocentVotesCount: number;
    isKing: boolean;
    isQueen: boolean;
    isPopular: boolean;
    isInnocent: boolean;
};
