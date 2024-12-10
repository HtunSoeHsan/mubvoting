"use client";
import { TypeTextAni } from "@/components/cell";
import { Header } from "@/components/header";
import { Nav } from "@/components/menus/Nav";
import StudentCard from "@/components/student-card";
import Image from "next/image";

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
      <div className="min-h-screen dark:bg-background bg-slate-100 py-8">
        <h2 className="text-4xl text-center py-10 font-bold mb-5">
          Our King & Queen Selection
        </h2>
        <div className="w-screen lg:max-w-7xl  space-y-5 md:space-y-10 mx-auto">
          <div className="flex justify-between items-center">
            <div className="px-5">
              <h4 className="text-xl capitalize">
                Please Vote to choose King and Popular
              </h4>
              <p className="text-sm opacity-75">Who will be KING or POPULAR</p>
            </div>
            <div className="gap-2 hidden md:flex">
              <Image
                src={"/young-man.png"}
                alt={`${name}'s photo`}
                width={100}
                height={100}
                className="w-[50px] h-[50px] object-contain"
                priority
              />
              <Image
                src={"/crown.png"}
                alt={`${name}'s photo`}
                width={100}
                height={100}
                className="w-[40px] h-[40px] animate-bounce object-contain"
                priority
              />
              <Image
                src={"/young-man.png"}
                alt={`${name}'s photo`}
                width={100}
                height={100}
                className="w-[50px] h-[50px] object-contain"
                priority
              />
            </div>
          </div>

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
  );
}
