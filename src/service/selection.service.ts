"use server";
import { db } from "@/firebase";
import { addSelections, getAllSelections } from "@/repository/selection.repo";
import { Gender } from "@prisma/client";
import { collection, query, where, getDocs } from "firebase/firestore";



export const addSelection = async () => {
  // return await addSelections(selections);
};

export const getSelections = async (gender?: Gender) => {
  return await getAllSelections(gender);
};


// ===================================== //
export async function getSelectionsByGender(gender: "male" | "female") {
const q = query(collection(db, 'selections'), where('gender', '==', "male"));

const snapshot = await getDocs(q);
return snapshot.forEach((doc) => doc.data());
}
