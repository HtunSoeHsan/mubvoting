"use client";
import { CustomAlert } from "@/components/cell/Alert";
import LoadingSpinner from "@/components/cell/LoadingSpinner";
import StudentCard from "@/components/student-card";
import { useAuth } from "@/context/auth";
import { db } from "@/firebase";
import { Selection } from "@/interface/selection";

import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUserAlreadyVoted, setIsUserAlreadyVoted] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { user } = useAuth();
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
        if (
          doc
            .data()
            .popularVotes.some(
              (vote: { email: string }) => vote.email === user?.email
            )
        ) {
          setIsUserAlreadyVoted(true);
        }
        selectionsArray.push(doc.data() as Selection);
      });
      setSelections(selectionsArray);
    } catch (error) {
      setErr("Something went wrong!");
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
      {err && (
        <CustomAlert key={err} variant="error" message={err} title="Error" />
      )}

      <div className="relative dark:bg-background  py-8">
        <div className="text-center mb-40 mt-10 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            VOTE FOR POPULAR
          </h1>
          <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full"></div>
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
                    grade={student.section}
                    image={student.profile}
                    gender={student.gender}
                    bio={""}
                    section={student.section}
                    gallery={student.gallery}
                    votetype="popularVotes"
                    alreadyVoted={isUserAlreadyVoted}
                    setUserVoted={() => setIsUserAlreadyVoted(true)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
