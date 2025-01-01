"use client";
import LoadingSpinner from "@/components/cell/LoadingSpinner";
import StudentCard from "@/components/student-card";
import { useAuth } from "@/context/auth";
import { db } from "@/firebase";
import { Selection } from "@/interface/selection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Page() {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  console.log({ user });
  const getIt = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "selections"),
        where("gender", "==", "male")
      );
      const snapshot = await getDocs(q);
      const selectionsArray: Selection[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        selectionsArray.push({
          name: data.name,
          profile: data.profile,
          gallery: data.gallery,
          gender: data.gender,
          selection_no: data.selection_no,
          section: data.section,
          address: data.address,
        } as Selection);
      });
      setSelections(selectionsArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getIt();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <div className="relative dark:bg-background  py-8">
        <div className="text-wrapper mb-24 md:mb-32 text-center">
          <div className="text-container text-background">Vote for King</div>
          <div className="text-container text-front">Vote for King</div>
        </div>

        <div className="lg:max-w-[90%]  space-y-5 md:space-y-28 mx-auto">
          <div className="space-y-[100px]">
            <div className="mx-auto p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 md:gap-y-24 lg:gap-y-36">
              {selections
                .sort((a, b) => a.selection_no - b.selection_no)
                .map((student, i) => (
                  <StudentCard
                    key={i}
                    no={student.selection_no}
                    name={student.name}
                    grade={"Grad"}
                    image={student.profile}
                    gender={student.gender}
                    bio={""}
                    gallery={student.gallery}
                    onVote={() => {}}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
