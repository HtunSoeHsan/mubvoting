import Image from "next/image";
import { FC, ReactNode } from "react";

interface LoginCardProps {
  imgUrl: string;
  content: {
    title: string;
    description: string;
  };
  children: ReactNode;
  current_email ?: string
}

const LoginCard: FC<LoginCardProps> = ({ imgUrl, content, children ,current_email }) => {

  return (
    <div className="w-full lg:w-[500px] text-center space-y-7 p-5 lg:p-0">
      {/* Image */}
      <div>
        <Image
          src={imgUrl}
          alt={`svg photo`}
          width={300}
          height={300}
          className=" lg:w-[80%] mx-auto"
          priority
        />
      </div>
      {/* some text  */}
      <div className="space-y-1">
        <h4 className="font-bold text-[24px]">{content.title}</h4>
        <p className="text-slate-600 text-[16px]">{content.description}</p>
        {current_email && <p className="font-semibold text-[16px]">{current_email}</p>}
      </div>

      {/* email input  */}

      <div>{children}</div>

      <div className="">
        <p className="mt-10 opacity-60">
          @ 2024-2025 King & Queen Voting System
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
