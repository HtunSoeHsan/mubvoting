"use client";
import LoadingSpinner from "@/components/cell/LoadingSpinner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VoteBoardCard from "@/components/VoteBoardCard";
import { db } from "@/firebase";
import { Selection } from "@/interface/selection";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [selections, setSelections] = useState<{
    male: Selection[];
    female: Selection[];
  }>({ male: [], female: [] });
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [votedUsers, setVotedUsers] = useState(0);
  const getRealTimeData = useCallback(() => {
    setLoading(true);

    const userCollection = collection(db, "users");

    const unsubscribeTotal = onSnapshot(userCollection, (snapshot) => {
      setTotalUsers(snapshot.size);
    });

    const votedQuery = query(userCollection, where("voted", "==", true));

    const unsubscribeVoted = onSnapshot(votedQuery, (snapshot) => {
      setVotedUsers(snapshot.size);
    });
    const maleQuery = query(
      collection(db, "selections"),
      where("gender", "==", "male")
    );
    const unsubscribeMale = onSnapshot(
      maleQuery,
      (snapshot) => {
        const male: Selection[] = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as Selection)
        );
        setSelections((prev) => ({ ...prev, male }));
      },
      (error) => console.error("Error fetching male data: ", error)
    );

    const femaleQuery = query(
      collection(db, "selections"),
      where("gender", "==", "female")
    );
    const unsubscribeFemale = onSnapshot(
      femaleQuery,
      (snapshot) => {
        const female: Selection[] = snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
            } as Selection)
        );
        setSelections((prev) => ({ ...prev, female }));
      },
      (error) => console.error("Error fetching female data: ", error)
    );

    setLoading(false);

    return () => {
      unsubscribeMale();
      unsubscribeFemale();
      unsubscribeTotal();
      unsubscribeVoted();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getRealTimeData();
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="m-4 ">
        <div className="flex  gap-3 items-center justify-around ">
          <div className="px-2 flex flex-wrap gap-12 justify-center items-center w-full ">
            <Card className="border-[#176B87] border-4">
              <CardHeader className="px-14">
                <CardTitle>{totalUsers}</CardTitle>
                <CardDescription>Login Users</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-[#176B87] border-4">
              <CardHeader className="px-14">
                <CardTitle>{votedUsers}</CardTitle>
                <CardDescription>Voted users</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="flex flex-wrap m-4 p1  ">
          <VoteBoardCard items={selections.male} title="King" />
          <VoteBoardCard items={selections.female} title="Queen" />
          <VoteBoardCard items={selections.male} title="Popular" />
          <VoteBoardCard items={selections.female} title="Innocent" />
        </div>
      </div>
    </>
  );
}
