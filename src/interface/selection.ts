import { Gender } from "@prisma/client";

export interface Selection {
  id?: number;
  name: string;
  profile: string;
  age?: number;
  gender: Gender;
  section?: string;
  king?: number;
  queen?: number;
  popular?: number;
  innocent?: number;
  dob?: Date | null;
  address?: string;
  selection_year?: string;
  selected?: boolean;
  gallery?: string[]; // Array of image URLs for the Gallery
}