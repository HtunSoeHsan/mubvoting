"use client";
import { TypeTextAni } from "@/components/cell";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/menus/Nav";
import Navbar from "@/components/menus/Navbar";
import SectionHeader from "@/components/SectionHeader";
import StudentCard from "@/components/student-card";

const contents = {
  boys: {
    title: "Please Vote to choose KING and POPULAR",
    subtitle: "Who will be KING or POPULAR",
    images: {
      first: "/young-man.png",
      second: "/crown.png",
      third: "/young-man.png",
    },
  },
  girls: {
    title: "Please Vote to choose QUEEN and INNOCENT",
    subtitle: "Who will be QUEEN or INNOCENT",
    images: {
      first: "/woman.png",
      second: "/crown.png",
      third: "/woman.png",
    },
  },
};

const students = [
  {
    id: 1,
    no: 1,
    name: "John Doe",
    grade: "10th Grade",
    gender: "male",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg", // Replace with your images
    bio: "Passionate about making our school better and more inclusive.",
  },
  {
    id: 2,
    no: 2,
    name: "Jane Smith",
    grade: "11th Grade",
    gender: "male",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 3,
    no: 3,
    name: "Jane Smith",
    grade: "11th Grade",
    gender: "female",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 4,
    no: 4,
    name: "Jane Smith",
    grade: "11th Grade",
    gender: "female",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 5,
    no: 5,
    name: "Jane Smith",
    grade: "11th Grade",
    gender: "male",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
];

export default function Home() {
  return (
    <div className="bg-[#f5f5f5] text-foreground overflow-hidden">
      <Hero />
      <Navbar />
      <div className="relative py-8">
        <div className="text-wrapper mb-10 md:mb-20 text-center">
          <div className="text-container text-background">
            King & Queen Selection
          </div>
          <div className="text-container text-front">
            King & Queen Selection
          </div>
        </div>

        <div className="lg:max-w-[90%]  space-y-5 md:space-y-28 mx-auto">
          {/* For king Selection */}
          <div className="space-y-[100px]">
            <SectionHeader
              title={contents.boys.title}
              subTitle={contents.boys.subtitle}
              images={contents.boys.images}
            />

            <div className="mx-auto p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 md:gap-y-24 lg:gap-y-36">
              {students.map((student) => (
                <StudentCard
                  no={student.no}
                  key={student.id}
                  name={student.name}
                  grade={student.grade}
                  image={student.image}
                  gender={student.gender}
                  bio={student.bio}
                  onVote={() => {}}
                />
              ))}
            </div>
          </div>

          {/* For Queen Selection */}
          <div className="space-y-[100px]">
            <SectionHeader
              title={contents.girls.title}
              subTitle={contents.girls.subtitle}
              images={contents.girls.images}
            />

            <div className="mx-auto p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 md:gap-y-24 lg:gap-y-36">
              {students.map((student) => (
                <StudentCard
                  no={student.no}
                  key={student.id}
                  name={student.name}
                  grade={student.grade}
                  image={student.image}
                  gender={student.gender}
                  bio={student.bio}
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
