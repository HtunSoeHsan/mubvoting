// import { Button } from "@/components/ui/button";
// import { getSelections } from "@/service/selection.service";
// import { devote, postVote } from "@/service/vote.service";
// import { VoteType } from "@prisma/client";
// import React from "react";

async function page() {
  //   console.log(await getAllVotes());
  // const vote = await getVoteCounts()
  // console.log("Vote counts", vote );

  // const selections = await getSelections();

  return (
    <div className=" w-screen h-screen bg-green-500 text-5xl text-white font-mono flex-col flex items-center justify-center">
      THIS PAGE IS TESTING FOR ALL BACKEND LOGIC
      {/* <div className="flex gap-4 mt-4">
        <Button
          onClick={async () => {
            "use server";
            await devote({ vote_type: "INNOCENT", selection_id: 1 });
          }}
        >
          DEVOTE
        </Button>
        <Button
          onClick={async () => {
            "use server";
            await postVote({ selection_id: 2, vote_type: "KING" });
          }}
        >
          Vote King
        </Button>
        <Button
          onClick={async () => {
            "use server";
            await postVote({ selection_id: 1, vote_type: "QUEEN" });
          }}
        >
          Vote Queen
        </Button>
        <Button
          onClick={async () => {
            "use server";
            await postVote({ selection_id: 2, vote_type: "POPULAR" });
          }}
        >
          Vote Popular
        </Button>
        <Button
          onClick={async () => {
            "use server";
            await postVote({ selection_id: 1, vote_type: "INNOCENT" });
          }}
        >
          Vote Innocent
        </Button>
      </div> */}
    </div>
  );
}

export default page;
