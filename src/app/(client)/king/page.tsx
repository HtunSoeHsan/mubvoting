"use client";
import LoadingSpinner from "@/components/cell/LoadingSpinner";
import StudentCard from "@/components/student-card";
import { Selection } from "@/interface/selection";
import { getSelections } from "@/service/selection.service";
import { useEffect, useState } from "react";

export default function Page() {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    setLoading(true);
    await getSelections("MALE")
      .then((data) => {
        console.log(data);
        setSelections(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <div className="relative dark:bg-background  py-8">
        <div className="text-wrapper mb-24 md:mb-32 text-center">
          <div className="text-container text-background">Vote for King</div>
          <div className="text-container text-front">Vote for King</div>
        </div>

        <div className="lg:max-w-[90%]  space-y-5 md:space-y-28 mx-auto">
          <div className="space-y-[100px]">
            <div className="mx-auto p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 md:gap-y-24 lg:gap-y-36">
              {selections.map((student) => (
                <StudentCard
                  key={student.id}
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
