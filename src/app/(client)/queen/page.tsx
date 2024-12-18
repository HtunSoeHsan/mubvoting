"use client";
import StudentCard from "@/components/student-card";
import { getSelections } from "@/service/selection.service";
import { useEffect, useState } from "react";

// const students = [
//   {
//     id: 1,
//     no: 1,
//     name: "John Doe",
//     grade: "10th Grade",
//     gender: "male",
//     image:
//       "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg", // Replace with your images
//     bio: "Passionate about making our school better and more inclusive.",
//   },
//   {
//     id: 2,
//     no: 2,
//     name: "Jane Smith",
//     grade: "11th Grade",
//     gender: "male",
//     image:
//       "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
//     bio: "Committed to representing student voices and creating change.",
//   },
//   {
//     id: 3,
//     no: 3,
//     name: "Jane Smith",
//     grade: "11th Grade",
//     gender: "male",
//     image:
//       "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
//     bio: "Committed to representing student voices and creating change.",
//   },
//   {
//     id: 4,
//     no: 4,
//     name: "Jane Smith",
//     grade: "11th Grade",
//     gender: "male",
//     image:
//       "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
//     bio: "Committed to representing student voices and creating change.",
//   },
//   {
//     id: 5,
//     no: 5,
//     name: "Jane Smith",
//     grade: "11th Grade",
//     gender: "male",
//     image:
//       "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
//     bio: "Committed to representing student voices and creating change.",
//   },
// ];

export default function Page() {
  const [selections, setSelections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    await getSelections("FEMALE")
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

  return (
    <div className="bg-background text-foreground">
      <div className="relative dark:bg-background  py-8">
        <div className="text-wrapper mb-24 md:mb-32 text-center">
          <div className="text-container text-background">Vote for Queen</div>
          <div className="text-container text-front">Vote for Queen</div>
        </div>

        <div className="lg:max-w-[90%]  space-y-5 md:space-y-28 mx-auto">
          <div className="space-y-[100px]">
            <div className="mx-auto p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 md:gap-y-24 lg:gap-y-36">
              {selections.map((student) => (
                <StudentCard
                  key={student.id}
                  no={student.selection_no}
                  name={student.name}
                  grade={student.section}
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
