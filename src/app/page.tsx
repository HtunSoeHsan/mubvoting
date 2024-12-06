"use client";
import { TypeTextAni } from "@/components/cell";
import { Header } from "@/components/header";
import { Nav } from "@/components/menus/Nav";
import StudentCard from "@/components/student-card";

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
  {
    id: 6,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 7,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 8,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 9,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
  {
    id: 10,
    name: "Jane Smith",
    grade: "11th Grade",
    image:
      "https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg",
    bio: "Committed to representing student voices and creating change.",
  },
];

export default function Home() {
  return (
    <>
      <Header
        bg="https://cdn.discordapp.com/attachments/1189886368277594116/1314585485804568587/FB_IMG_1733312834668.jpg?ex=67544ea3&is=6752fd23&hm=ea47d96282e1c608b5bf1e1a59bd8fb31e927dcba39ef925882317aee5018f04&"
        nav={<Nav />}
        hero={
          <div className="flex justify-center lg:pt-[200px] px-5 lg:text-4xl">
            <TypeTextAni />
          </div>
        }
      />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </>
  );
}
