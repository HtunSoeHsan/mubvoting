import { FC } from "react";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import Image from "next/image";

interface StudentCardProps {
  name: string;
  grade: string;
  image: string; // Path or URL to the student's photo
  bio: string; // Short description of the student
  onVote: () => void; // Callback when the vote button is clicked
}

const StudentCard: FC<StudentCardProps> = ({
  name,
  grade,
  image,
  bio,
  onVote,
}) => {
  return (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={`${name}'s photo`}
          fill
          className="object-cover rounded-t-lg"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold ">{name}</h3>
        <p className="text-sm ">Grade: {grade}</p>
        <p className="mt-2  text-sm">{bio}</p>
        <Button
          onClick={onVote}
          className="mt-4 w-full bg-primary  hover:bg-horver"
        >
          Vote for {name}
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;
