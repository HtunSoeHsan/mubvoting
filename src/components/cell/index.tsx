"use client";
import clsx from "clsx";
import { TypeAnimation } from "react-type-animation";

export const Hero = ({
  h1,
  h2,
  className,
}: {
  h1: string;
  h2: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "mx-auto mt-[100px] sm:mt-[120px] lg:mt-[180px] max-w-[90%] md:max-w-[700px] lg:max-w-[900px] border border-t-4 rounded-lg lg:ml-[150px] p-4 sm:p-6 lg:p-8 grid gap-4 sm:gap-6 lg:gap-[70px]  bg-white/10 backdrop-blur-md",
        className
      )}
    >
      <h1 className="text-[32px] sm:text-[40px] lg:text-[50px] font-bold leading-tight">
        {h1}
      </h1>
      <h2 className="text-[18px] sm:text-[20px] lg:text-[25px]">{h2}</h2>
    </div>
  );
};

export const TypeTextAni = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        // "We produce food for Mice",
        // 1000, // wait 1s before replacing "Mice" with "Hamsters"
        // "We produce food for Hamsters",
        // 1000,
        // "We produce food for Guinea Pigs",
        // 1000,
        "Welcome To Our University, Polytechnic University (MAUBIN). Voting System",
        1000,
      ]}
      //   wrapper="span"
      speed={50}
      className="text-white mt-20 mb-5 p-2 rounded-lg"
      style={{
        fontSize: "2rem",
        display: "inline-block",
        fontWeight: "bold",
        background: "gray",
        opacity: 0.5,
      }}
      repeat={Infinity}
    />
  );
};
