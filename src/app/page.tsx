"use client";
import { TypeTextAni } from "@/components/cell";
import { Header } from "@/components/header";
import { Nav } from "@/components/menus/Nav";
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
    name: "John Doe",
    grade: "10th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg", // Replace with your images
    bio: "Passionate about making our school better and more inclusive.",
  },
  {
    id: 2,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 3,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 4,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 5,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <Header
        bg="/mub-poly.jpg"
        nav={<Nav />}
        hero={
          <div className="flex justify-center lg:pt-[200px] px-5 lg:text-4xl">
            <TypeTextAni />
          </div>
        }
      />
      {/* <h2 className="text-4xl text-center py-10 font-bold mb-5">
            Our King & Queen Selection
          </h2> */}
      <div className="min-h-screen  dark:bg-background soft-dark py-8">
        <div className="text-wrapper mb-10 md:mb-20 text-center">
          <div className="text-container text-background">
            King & Queen Selection
          </div>
          <div className="text-container text-front">
            King & Queen Selection
          </div>
        </div>

        <div className="w-screen lg:max-w-[90%]  space-y-5 md:space-y-28 mx-auto">

          {/* For king Selection */}
          <div className="space-y-10">
            <SectionHeader
              title={contents.boys.title}
              subTitle={contents.boys.subtitle}
              images={contents.boys.images}
            />

            <div className="mx-auto p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  name={student.name}
                  grade={student.grade}
                  image={student.image}
                  bio={student.bio}
                  onVote={() => {}}
                />
              ))}
            </div>
          </div>

          {/* For Queen Selection */}
          <div className="space-y-10">
            <SectionHeader
              title={contents.girls.title}
              subTitle={contents.girls.subtitle}
              images={contents.girls.images}
            />

            <div className="mx-auto p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  name={student.name}
                  grade={student.grade}
                  image={student.image}
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
