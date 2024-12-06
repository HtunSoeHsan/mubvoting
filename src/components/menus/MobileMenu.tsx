"use client";
import { conf } from "@/config";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  nav: boolean;
  closeNav: () => void;
}

const MobileNav = ({ nav, closeNav }: Props) => {
  const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  //   const scrollToSection = (sectionId: string) => {
  //     const section = document.getElementById(sectionId);
  //     if (section) {
  //       section.scrollIntoView({ behavior: "smooth" });
  //       closeNav();
  //     }
  //   };
  return (
    <div
      className={`fixed ${navAnimation} transform transition-all duration-300 top-0 left-0 right-0 buttom-0 z-[100000] bg-[#09101a]/95 opacity`}
    >
      <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
        {conf.menus.map((menu, index) => (
          //   <div>
          //     <Link
          //     href={menu.link}
          //     key={index}
          //     className="nav-link-mobile text-black"
          //   >
          //     {menu.label}
          //   </Link>
          //   </div>
          <div key={index} className="w-full">
            <div className="flex justify-center items-center px-4 py-3 text-black cursor-pointer">
              <Link
                href={menu.link}
                // onClick={() => {
                //   if (!menu.dropdown) closeNav();
                // }}
                className="nav-link-mobile"
              >
                {menu.label}
              </Link>
            </div>
          </div>
        ))}
        <div
          onClick={closeNav}
          className="absolute cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-yellow-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
