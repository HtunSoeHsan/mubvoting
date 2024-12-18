"use client";
import { TypeTextAni } from "@/components/cell";
import { Hero } from "@/components/hero";
import Navbar from "@/components/menus/Navbar";
import SectionHeader from "@/components/SectionHeader";
import StudentCard from "@/components/student-card";
import { getSelections } from "@/service/selection.service";
import { useEffect, useState } from "react";

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
  const [selections, setSelections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    await getSelections()
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

  return <div className="bg-background text-foreground"></div>;
}
