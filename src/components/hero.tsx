"use client";
import Image from "next/image";
import { TypeTextAni } from "./cell";
import Particle from "./Particle";
export const Hero = () => {
  return (
    <div
      className="shadow bg-transparent bg-cover bg-center min-h-[400px] sm:min-h-[500px] lg:min-h-[710px]"
      style={{ backgroundImage: `url(/images/mub-poly.jpg)` }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#09101A", opacity: 0.7 }}
      ></div>

      <Particle />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Image
          src={"/images/logo.png"}
          alt="poly-logo"
          width={400}
          height={400}
          className="relative mt-5 lg:ml-20"
        />
        <TypeTextAni />
      </div>
    </div>
  );
};
