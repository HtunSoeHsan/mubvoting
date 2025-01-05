"use client";
import { TypeAnimation } from "react-type-animation";

export const TypeTextAni = () => {
  return (
    <TypeAnimation
      sequence={[
        "Welcome To Our Voting System, ",
        1000,
        "Computer University (MAUBIN).",
        1000,
        "Polytechnic University (MAUBIN).",
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
