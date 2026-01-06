"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { db } from "@/firebase";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { Settings } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Setting() {
  const [isLoading, setIsLoading] = useState(false);
  const [voteStatus, setVoteStatus] = useState(false);
  const [voteId, setVoteId] = useState("");
  async function handelSwitch() {
    if (!voteId) return;
    const settingDoc = doc(db, "setting", voteId);
    console.log(voteId);

    await updateDoc(settingDoc, { voteStatus: !voteStatus });
    setVoteStatus((prev) => !prev);
  }

  async function fetchSetting() {
    try {
      setIsLoading(true);
      const settingRef = collection(db, "setting");
      const q = query(settingRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) => {
        setVoteId(doc.id);
        setVoteStatus(doc.data().voteStatus);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSetting();
  }, []);

  return (
    <div className="flex flex-1  overflow-y-hidden flex-col  m-8 min-w-[300px]  md:min-w-[600px] lg:min-w-[1000px] w-full">
      <div className="px-4 py-4 rounded-md shadow-md w-[75%] lg:w-1/2 ">
        <h2 className="flex space-x-2 mb-6 text-2xl font-bold leading-tight">
          Setting{" "}
          <Settings className=" animate-spin" width={"20"} height={"20"} />
        </h2>
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="flex items-center space-x-4">
            <Switch
              checked={voteStatus}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 "
              onClick={handelSwitch}
              id="vote-status"
            />
            <Label htmlFor="vote-status" className="lg:text-xl md:text-base text-base leading-tight">
              Vote Status
              {voteStatus ? (
                <span className="ml-2 text-green-400 font-bold">(ON)</span>
              ) : (
                <span className="ml-2 text-red-400 font-bold">(OFF)</span>
              )}
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}
