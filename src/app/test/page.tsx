import { getAllVotes, getVoteCounts, postVote } from "@/service/vote.service";
import React from "react";

async function page() {
  //   console.log(await getAllVotes());
    // const vote = await getVoteCounts()
    // console.log("Vote counts", vote );

  const select = await postVote({ selection_id: 1, vote_type: "QUEEN" });
  console.log(select);
  

  return (
    <div className=" w-screen h-screen bg-green-500 text-5xl text-white font-mono flex items-center justify-center">
      THIS PAGE IS TESTING FOR ALL BACKEND LOGIC
    </div>
  );
}

export default page;
