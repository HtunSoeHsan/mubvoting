import { Selection } from "@/interface/selection";

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
      default:
        return null;
    }
  };

  const voteCountProperty = getVoteCountProperty();

  // Sort the items based on the corresponding vote count property
  const sortedItems = [...items].sort((a, b) => {
    if (!voteCountProperty) return 0; // No sorting if property is null
    return b[voteCountProperty] - a[voteCountProperty];
  });

  return (
    <div className="pt-2 mx-2 rounded-lg flex flex-col border-2 bg-[#053025]">
      <p className="text-left rounded-r-full bg-[#FFC145] font-bold text-lg px-14 py-2 mb-8">
        {title}
      </p>
      {sortedItems.map((item, i) => (
        <div key={i} className="flex items-center justify-center ">
          <div className="text-start flex-1 bg-[#FFC145] text-black font-bold text-lg rounded-l-full rounded-r-md rounded-md shadow-md p-2 mt-2 ms-4 mr-1">
            <span className="text-white mr-5 text-lg">{item.selection_no}</span>
            {item.name}
          </div>
          <div className="text-end flex-none bg-[#FFC145] text-black font-bold text-lg  rounded-r-full rounded-r-md shadow-md p-2 mt-2 mr-2">
            {title === "King" && item.kingVotesCount}
            {title === "Queen" && item.queenVotesCount}
            {title === "Popular" && item.popularVotesCount}
            {title === "Innocent" && item.innocentVotesCount}
          </div>
        </div>
      ))}
      <button className="mt-8 text-center bg-[#FFC145] font-bold text-lg px-14 py-2">
        SELECT
      </button>
    </div>
  );
}
