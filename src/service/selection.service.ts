"use server";
import { db } from "@/firebase";
import { addSelections, getAllSelections } from "@/repository/selection.repo";
import { Gender } from "@prisma/client";
import { collection, query, where, getDocs } from "firebase/firestore";


const selections =  [
  {
    name: "Paing Phyo Thu",
    profile: "/images/Paing_Phyo_Thu/profile.jpg", // please follow path format
    age: 19,
    selection_no: 1, // ခါးနံပါတ်
    gender: Gender.MALE,
    section: "B",
    address: "Kyaiklat",
    gallery: ["/images/Paing_Phyo_Thu/image_1.jpg", "/images/Paing_Phyo_Thu/image_2.jpg","/images/Paing_Phyo_Thu/image_3.jpg","/images/Paing_Phyo_Thu/image_4.jpg","/images/Paing_Phyo_Thu/image_5.jpg","/images/Paing_Phyo_Thu/image_6.jpg","/images/Paing_Phyo_Thu/image_7.jpg","/images/Paing_Phyo_Thu/image_8.jpg",], // Gallery images for this selection
  },
  {
    name: "Ei Shwe Sin Htet",
    profile: "/images/Ei_Shwe_Sin_Htet/profile.jpg",
    age: 18,
    selection_no: 1, 
    gender: Gender.FEMALE,
    section: "A",
    address: "Kyaiklat",
    gallery: ["/images/Ei_Shwe_Sin_Htet/image_1.jpg", "/images/Ei_Shwe_Sin_Htet/image_2.jpg", "/images/Ei_Shwe_Sin_Htet/image_3.jpg","/images/Ei_Shwe_Sin_Htet/image_4.jpg","/images/Ei_Shwe_Sin_Htet/image_5.jpg","/images/Ei_Shwe_Sin_Htet/image_6.jpg","/images/Ei_Shwe_Sin_Htet/image_7.jpg","/images/Ei_Shwe_Sin_Htet/image_8.jpg",], // can add more
  },
  {
    name: "Thaw Bhone Htet",
    profile: "/images/Thaw_Bhone_Htet/profile.jpg", // please follow path format
    age: 18,
    selection_no: 2, // ခါးနံပါတ်
    gender: Gender.MALE,
    section: "A",
    address: "Yangon",
    gallery: ["/images/Thaw_Bhone_Htet/image_1.jpg", "/images/Thaw_Bhone_Htet/image_2.jpg","/images/Thaw_Bhone_Htet/image_3.jpg","/images/Thaw_Bhone_Htet/image_4.jpg", "/images/Thaw_Bhone_Htet/image_5.jpg","/images/Thaw_Bhone_Htet/image_6.jpg","/images/Thaw_Bhone_Htet/image_7.jpg","/images/Thaw_Bhone_Htet/image_8.jpg"], // Gallery images for this selection
  },
  {
    name: "Htet Htet Aung",
    profile: "/images/Htet_Htet_Aung/profile.jpg",
    age: 18,
    selection_no: 2, 
    gender: Gender.FEMALE,
    section: "A",
    address: "Maubin",
    gallery: ["/images/Htet_Htet_Aung/image_1.jpg", "/images/Htet_Htet_Aung/image_2.jpg", "/images/Htet_Htet_Aung/image_3.jpg","/images/Htet_Htet_Aung/image_4.jpg","/images/Htet_Htet_Aung/image_5.jpg","/images/Htet_Htet_Aung/image_6.jpg","/images/Htet_Htet_Aung/image_7.jpg","/images/Htet_Htet_Aung/image_8.jpg",],
  },
  {
    name: "Okkar Thu",
    profile: "/images/Okkar_Thu/profile.jpg", // please follow path format
    age: 18,
    selection_no: 3, // ခါးနံပါတ်
    gender: Gender.MALE,
    section: "B",
    address: "Yangon",
    gallery: ["/images/Okkar_Thu/image_1.jpg", "/images/Okkar_Thu/image_2.jpg","/images/Okkar_Thu/image_3.jpg","/images/Okkar_Thu/image_4.jpg","/images/Okkar_Thu/image_5.jpg","/images/Okkar_Thu/image_6.jpg","/images/Okkar_Thu/image_7.jpg","/images/Okkar_Thu/image_8.jpg"],
  },
  {
    name: "Yoon Lae Lae Khaing",
    profile: "/images/Yoon_Lae_Lae_Khaing/profile.jpg",
    age: 18,
    selection_no: 3, 
    gender: Gender.FEMALE,
    section: "A",
    address: "Kyaiklat",
    gallery: ["/images/Yoon_Lae_Lae_Khaing/image_1.jpg", "/images/Yoon_Lae_Lae_Khaing/image_2.jpg", "/images/Yoon_Lae_Lae_Khaing/image_3.jpg","/images/Yoon_Lae_Lae_Khaing/image_4.jpg","/images/Yoon_Lae_Lae_Khaing/image_5.jpg","/images/Yoon_Lae_Lae_Khaing/image_6.jpg","/images/Yoon_Lae_Lae_Khaing/image_7.jpg","/images/Yoon_Lae_Lae_Khaing/image_8.jpg",], 
  },
  {
    name: "Bhone Pyae Khant",
    profile: "/images/Bhone_Pyae_Khant/profile.jpg", // please follow path format
    age: 18,
    selection_no: 4, // ခါးနံပါတ်
    gender: Gender.MALE,
    section: "A",
    address: "Nyaungdon",
    gallery: ["/images/Bhone_Pyae_Khant/image_1.jpg", "/images/Bhone_Pyae_Khant/image_2.jpg","/images/Bhone_Pyae_Khant/image_3.jpg", "/images/Bhone_Pyae_Khant/image_4.jpg","/images/Bhone_Pyae_Khant/image_5.jpg","/images/Bhone_Pyae_Khant/image_6.jpg","/images/Bhone_Pyae_Khant/image_7.jpg","/images/Bhone_Pyae_Khant/image_8.jpg"], // Gallery images for this selection
  },
  {
    name: "Thein Yati Nwe",
    profile: "/images/Thein_Yati_Nwe/profile.jpg",
    age: 18,
    selection_no: 4, 
    gender: Gender.FEMALE,
    section: "B",
    address: "Nay Pyi Taw",
    gallery: ["/images/Thein_Yati_Nwe/image_1.jpg", "/images/Thein_Yati_Nwe/image_2.jpg", "/images/Thein_Yati_Nwe/image_3.jpg","/images/Thein_Yati_Nwe/image_4.jpg","/images/Thein_Yati_Nwe/image_5.jpg","/images/Thein_Yati_Nwe/image_6.jpg","/images/Thein_Yati_Nwe/image_7.jpg","/images/Thein_Yati_Nwe/image_8.jpg",]
  },
  {
    name: "Chit Min Thu",
    profile: "/images/Chit_Min_Thu/profile.jpg", // please follow path format
    age: 18,
    selection_no: 5, // ခါးနံပါတ်
    gender: Gender.MALE,
    section: "B",
    address: "Pyapon",
    gallery: ["/images/Chit_Min_Thu/image_1.jpg", "/images/Chit_Min_Thu/image_2.jpg", "/images/Chit_Min_Thu/image_3.jpg","/images/Chit_Min_Thu/image_4.jpg","/images/Chit_Min_Thu/image_5.jpg","/images/Chit_Min_Thu/image_6.jpg","/images/Chit_Min_Thu/image_7.jpg","/images/Chit_Min_Thu/image_8.jpg",]
  },
  {
    name: "Hnin Hnin Hsan",
    profile: "/images/Hnin_Hnin_Hsan/profile.jpg",
    age: 18,
    selection_no: 5, 
    gender: Gender.FEMALE,
    section: "A",
    address: "Maubin",
    gallery: ["/images/Hnin_Hnin_Hsan/image_1.jpg", "/images/Hnin_Hnin_Hsan/image_2.jpg", "/images/Hnin_Hnin_Hsan/image_3.jpg","/images/Hnin_Hnin_Hsan/image_4.jpg","/images/Hnin_Hnin_Hsan/image_5.jpg","/images/Hnin_Hnin_Hsan/image_6.jpg","/images/Hnin_Hnin_Hsan/image_7.jpg","/images/Hnin_Hnin_Hsan/image_8.jpg",]
  },

]; 

export const addSelection = async () => {
  return await addSelections(selections);
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
