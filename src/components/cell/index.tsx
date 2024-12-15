"use client";
import clsx from "clsx";
import { TypeAnimation } from "react-type-animation";

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
        "Welcome To Our University, Polytechnic University (MAUBIN).",
        1000,
      ]}
      //   wrapper="span"
      speed={50}
      className="m-5 lg:mt-[350px] lg:mr-20 p-2 rounded-lg text-lg lg:text-4xl"
      style={{
        // fontSize: "2rem",
        display: "inline-block",
        fontWeight: "bold",
        background: "gray",
        color: "#F8C952",
        opacity: 0.9,
      }}
      repeat={Infinity}
    />
  );
};
