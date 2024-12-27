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
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  // const King = [
  //   { id: 1, name: "Thaw Bhonte Htet" },
  //   { id: 2, name: "Okkar Thu" },
  //   { id: 3, name: "Thein Yati Nwe" },
  //   { id: 4, name: "Yoon Lae Lae Khaing" },
  //   { id: 5, name: "Hnin Hnin Hsan" },
  // ];

  const irefresh = "/refresh.png";

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
          {/* <div className="pt-2 mx-2 rounded-lg flex flex-col border-2 bg-[#053025]">
            <p className="text-left rounded-r-full rounded-br-full bg-[#FFC145]  font-bold text-lg  px-14 py-2 mb-8">
              King{" "}
            </p>
            {selections.male.map((s, i) => (
              <div
                key={i}
                className="text-center bg-[#FFC145]  font-bold text-lg rounded-l-full rounded-r-md px-8 py-2 ml-4 mt-1"
              >
                {s.name}
              </div>
            ))}
            <button className="mt-8 text-center bg-[#FFC145] font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div>
          <div className="pt-2  mx-2 rounded-lg flex flex-col border-2 bg-[#053025]">
            <p className="text-left bg-[#FFC145]  rounded-r-full rounded-br-full  font-bold text-lg  px-14 py-2 mb-8">
              Popular{" "}
            </p>
            {selections.male.map((s, i) => (
              <button
                key={i}
                className="text-center bg-[#FFC145]  font-bold text-lg rounded-l-full rounded-r-md px-8 py-2 ml-4 mt-1"
              >
                {s.name}
              </button>
            ))}
            <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div>
          <div className="pt-2  mx-2  rounded-md flex flex-col border-2 bg-[#053025]">
            <p className="text-left rounded-r-full rounded-br-full bg-[#FFC145]  font-bold text-lg  px-14 py-2 mb-8">
              Queen{" "}
            </p>
            {selections.female.map((s, i) => (
              <button
                key={i}
                className="text-center bg-[#FFC145]  font-bold text-lg rounded-l-full rounded-r-md px-8 py-2 ml-4 mt-1"
              >
                {s.name}
              </button>
            ))}
            <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div>
          <div className="pt-2  mx-2  rounded-md flex flex-col border-2 bg-[#053025]">
            <p className="text-left bg-[#FFC145] rounded-r-full rounded-br-full font-bold text-lg  px-14 py-2 mb-8">
              Innocence{" "}
            </p>
            {selections.female
              .sort((a, b) => b.innocentVotesCount - a.innocentVotesCount)
              .map((s, i) => (
                <div key={i} className="flex items-center justify-center ">
                  <div className="text-start flex-1 bg-[#FFC145] text-black font-bold text-lg rounded-l-full rounded-r-md rounded-md shadow-md p-2 mt-2 ms-4 mr-1">
                    <span className="text-white mr-5 text-lg">
                      {s.selection_no}
                    </span>
                    {s.name}
                  </div>
                  <div className="text-end flex-none bg-[#FFC145] text-black font-bold text-lg  rounded-r-full rounded-r-md shadow-md p-2 mt-2 mr-2">
                    {s.innocentVotesCount}
                  </div>
                </div>
              ))}
            <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div> */}
          <VoteBoardCard items={selections.male} title="King" />
          <VoteBoardCard items={selections.female} title="Queen" />
          <VoteBoardCard items={selections.male} title="Popular" />
          <VoteBoardCard items={selections.female} title="Innocent" />
        </div>
      </div>
    </>
  );
}
