"use client";
import { Hero } from "@/components/hero";
import SelectionCard from "@/components/SelectionCard";
import WhoWinCard from "@/components/WhoWinCard";
import { db } from "@/firebase";
import { Selection } from "@/interface/selection";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [selections, setSelections] = useState<{
    male: Selection[];
    female: Selection[];
  }>({ male: [], female: [] });
  const [loading, setLoading] = useState(false);

  const getRealTimeData = useCallback(() => {
    setLoading(true);
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
      (error) => {
        console.error("Error fetching male data: ", error);
      }
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
      (error) => {
        console.error("Error fetching female data: ", error);
      }
    );

    setLoading(false);

    return () => {
      unsubscribeMale();
      unsubscribeFemale();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getRealTimeData();
    return () => unsubscribe(); // Cleanup on unmount
  }, [getRealTimeData]);

  const king = selections.male.find((s) => s.isKing);
  const queen = selections.female.find((s) => s.isQueen);
  const popular = selections.male.find((s) => s.isPopular);
  const innocent = selections.female.find((s) => s.isInnocent);

  return (
    <div className="bg-background text-foreground">
      <Hero />
      <div>
        {/* <SelectionCard /> */}
        {/* <WhowiinCard /> */}
        <div className="flex grid gap-5 sm:grid-cols-1 sm:gap-5 p-10">
          <WhoWinCard
            title="KING"
            crownSrc="/crown-normal-queen.png"
            person={king}
            loading={loading}
            selections={selections.male}
          />
          <WhoWinCard
            title="QUEEN"
            crownSrc="/crown-normal-queen.png"
            person={queen}
            loading={loading}
            selections={selections.female}
          />
          <WhoWinCard
            title="Popular"
            crownSrc="/crown-normal-queen.png"
            person={popular}
            loading={loading}
            selections={selections.male}
          />
          <WhoWinCard
            title="Innocent"
            crownSrc="/crown-normal-queen.png"
            person={innocent}
            loading={loading}
            selections={selections.female}
          />
        </div>
      </div>
    </div>
  );
}
