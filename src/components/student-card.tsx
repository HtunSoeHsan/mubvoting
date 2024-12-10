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
    <div className="border hover:scale-105 transition-all duration-200 ease-in-out rounded-lg flex flex-col shadow-sm hover:shadow-lg">
      <div className="p-4">
        <Image
          src={image}
          alt={`${name}'s photo`}
          width={500}
          height={500}
          className="w-full h-[250px] rounded-lg  object-cover"
          priority
        />
      </div>
      <div className="py-3 flex flex-col gap-1">
        <h3 className="bg-gradient-to-tr from-gold to-yellow-700 p-2 w-[80%] rounded-r-full text-white">
          Zaw Hien htet
        </h3>
        <p className="p-2 opacity-85">{bio}</p>

        <div className="flex justify-between p-2 items-center">
          <p className="font-bold">Vote here : </p>
          <Button className="w-[40%] text-lg">
             <Image
              src={"/paper-airplane.png"}
              alt={`${name}'s photo`}
              width={500}
              height={500}
              className="w-[20px] h-[20px]"
              priority
            /> 
            
          </Button>
        </div>
      </div>
    </div>
    // <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    //   <div className="relative w-full h-48">
    //     <Image
    //       src={image}
    //       alt={`${name}'s photo`}
    //       fill
    //       className="object-cover rounded-t-lg"
    //       priority
    //     />
    //   </div>
    //   <div className="p-4">
    //     <h3 className="text-xl font-bold ">{name}</h3>
    //     <p className="text-sm ">Grade: {grade}</p>
    //     <p className="mt-2  text-sm">{bio}</p>
    //     <Button
    //       onClick={onVote}
    //       className="mt-4 w-full bg-primary  hover:bg-horver"
    //     >
    //       Vote for {name}
    //     </Button>
    //   </div>
    // </div>
  );
};

export default StudentCard;
