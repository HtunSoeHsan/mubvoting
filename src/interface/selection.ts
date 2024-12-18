import { $Enums, Gender } from "@prisma/client";

export interface SelectionPayload {
  id?: number;
  name: string;
  profile: string;
  age?: number;
  gender: Gender;
  section?: string;
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
};

export interface Selection {
  id: number;
    name: string;
    profile: string;
    age: number | null;
    gender: $Enums.Gender;
    selection_no: number;
    address: string | null;
    selected: boolean;
    gallery: {
        id: number;
        selection_id: number;
        image: string;
    }[];
};
