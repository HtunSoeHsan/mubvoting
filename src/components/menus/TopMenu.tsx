"use client";

import { conf } from "@/config";
import Link from "next/link";
import { ModeToggle } from "../cell/mode";

interface Props {
  openNav: () => void;
}
export const TopMenu = ({ openNav }: Props) => {
  return (
    <div className="container mx-auto px-4 py-5 flex justify-between items-center z-100">
      <Link href={conf.site.link} className="text-lg font-bold">
        {conf.site.label}
      </Link>

      {/* Navigation Menu */}
      <nav className={`hidden lg:block lg:flex lg:items-center lg:space-x-6`}>
        <ul className="flex justify-center items-center space-x-6 space-y-0">
          {conf.menus.map((menu, index) => (
            <li key={index} className="relative group">
              <Link href={menu.link} className="font-bold">
                {menu.label}
              </Link>
            </li>
          ))}
          <ModeToggle />
        </ul>
      </nav>

      {/* Hamburger Menu for Mobile */}
      <button
        className="lg:hidden text-yellow-400 flex items-center text-black hover:text-gray-700 z-20"
        onClick={openNav}
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
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  );
};
