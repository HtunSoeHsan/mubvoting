"use client";
import {
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Selection } from "@/interface/selection";
import { db } from "@/firebase";
import { useCookies } from "react-cookie";

export default function VoteBoardCard({
  title,
  items,
}: {
  title: "King" | "Queen" | "Popular" | "Innocent";
  items: Selection[];
  showVotes?: boolean;
}) {
  const [cookies, setCookie] = useCookies([
    "King",
    "Queen",
    "Popular",
    "Innocent",
  ]);
  const getVoteCountProperty = () => {
    switch (title) {
      case "King":
        return "kingVotesCount";
      case "Queen":
        return "queenVotesCount";
      case "Popular":
        return "popularVotesCount";
      case "Innocent":
        return "innocentVotesCount";
    }
  };

  const voteCountProperty = getVoteCountProperty();

  const sortedItems = [...items].sort((a, b) => {
    if (!voteCountProperty) return 0; // No sorting if property is null
    return b[voteCountProperty] - a[voteCountProperty];
  });

  const handleSelect = async (selection_no: number, gender: string) => {
    try {
      const selectionsCollection = collection(db, "selections");
      const q = query(
        selectionsCollection,
        where("selection_no", "==", selection_no),
        where("gender", "==", gender)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("No matching document found!");
        return;
      }
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        isQueen: title === "Queen",
        isKing: title === "King",
        isPopular: title === "Popular",
        isInnocent: title === "Innocent",
      });
      setCookie(title, "true", { path: "/" });
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="pt-2 mx-2 rounded-lg flex flex-col border-2 bg-[#053025] pb-4">
      <p className="flex justify-around items-center text-left rounded-r-full bg-[#FFC145] font-bold text-lg px-14 py-2 mb-8">
        {title}{" "}
        <span className="bg-white rounded-lg">
          {title === "King" && "👑"}
          {title === "Queen" && "👸"}
          {title === "Popular" && "🌟"}
          {title === "Innocent" && "😇"}
        </span>
      </p>
      {sortedItems.map((item, i) => (
        <div key={i} className="flex items-center justify-center">
          <button
            disabled={
              cookies[title] ||
              item.isKing ||
              item.isQueen ||
              item.isPopular ||
              item.isInnocent
            }
            className={`text-start flex-1 text-black font-bold text-lg rounded-l-full rounded-r-md rounded-md shadow-md p-2 mt-2 ms-4 mr-1 hover:border hover:border-white hover:bg-[#0E2C70] hover:text-white ${
              item.isKing || item.isQueen || item.isPopular || item.isInnocent
                ? "bg-[#0E2C70] text-white"
                : "bg-[#13AEF0]"
            }`}
            onClick={() => handleSelect(item.selection_no, item.gender)}
          >
            <span className="text-white mr-5 text-lg">{item.selection_no}</span>
            {item.name} {item.isKing && "👑"} {item.isQueen && "👸"}
            {item.isPopular && "🌟"}
            {item.isInnocent && "😇"}
          </button>
          <div className="text-end flex-none bg-[#FFC145] text-black font-bold text-lg  rounded-r-full rounded-r-md shadow-md p-2 mt-2 mr-2">
            {title === "King" && item.kingVotesCount}
            {title === "Queen" && item.queenVotesCount}
            {title === "Popular" && item.popularVotesCount}
            {title === "Innocent" && item.innocentVotesCount}
          </div>
        </div>
      ))}
      {/* <button
        className="mt-8 text-center bg-[#FFC145] font-bold text-lg px-14 py-2"
        onClick={handleSelect}
      >
        SELECT
      </button> */}
    </div>
  );
}
