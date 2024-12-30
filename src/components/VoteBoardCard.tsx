import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Selection } from "@/interface/selection";
import { db } from "@/firebase";

export default function VoteBoardCard({
  title,
  items,
  showVotes = true,
}: {
  title: "King" | "Queen" | "Popular" | "Innocent";
  items: Selection[];
  showVotes?: boolean;
}) {
  // Determine the appropriate vote count property based on the title
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

  // Sort the items based on the corresponding vote count property
  const sortedItems = [...items].sort((a, b) => {
    if (!voteCountProperty) return 0; // No sorting if property is null
    return b[voteCountProperty] - a[voteCountProperty];
  });

  const handleSelect = async () => {
    try {
      const maxVotes = sortedItems[0][voteCountProperty];
      const winner = sortedItems.filter(
        (item) => item[voteCountProperty] === maxVotes
      );
      // Step 1: Query Firestore to find the document with the given selection_no
      const selectionsCollection = collection(db, "selections");
      console.log("id", selectionsCollection.id);
      const q = query(
        selectionsCollection,
        where("selection_no", "==", winner[0].selection_no),
        where("gender", "==", winner[0].gender)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("No matching document found!");
        return;
      }

      // Step 2: Get the document reference (assuming selection_no is unique)
      const docRef = querySnapshot.docs[0].ref;

      // Step 3: Update the document
      await updateDoc(docRef, {
        isQueen: title === "Queen",
        isKing: title === "King",
        isPopular: title === "Popular",
        isInnocent: title === "Innocent",
      });

      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <div className="pt-2 mx-2 rounded-lg flex flex-col border-2 bg-[#053025]">
      <p className="text-left rounded-r-full bg-[#FFC145] font-bold text-lg px-14 py-2 mb-8">
        {title}
      </p>
      {sortedItems.map((item, i) => (
        <div key={i} className="flex items-center justify-center ">
          <div className="text-start flex-1 bg-[#13AEF0] text-black font-bold text-lg rounded-l-full rounded-r-md rounded-md shadow-md p-2 mt-2 ms-4 mr-1">
            <span className="text-white mr-5 text-lg">{item.selection_no}</span>
            {item.name} {item.isKing && "👑"} {item.isQueen && "👸"}
            {item.isPopular && "🌟"}
            {item.isInnocent && "😇"}
          </div>
          <div className="text-end flex-none bg-[#FFC145] text-black font-bold text-lg  rounded-r-full rounded-r-md shadow-md p-2 mt-2 mr-2">
            {title === "King" && item.kingVotesCount}
            {title === "Queen" && item.queenVotesCount}
            {title === "Popular" && item.popularVotesCount}
            {title === "Innocent" && item.innocentVotesCount}
          </div>
        </div>
      ))}
      <button
        className="mt-8 text-center bg-[#FFC145] font-bold text-lg px-14 py-2"
        onClick={handleSelect}
      >
        SELECT
      </button>
    </div>
  );
}
