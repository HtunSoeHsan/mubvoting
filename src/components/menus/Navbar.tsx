"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cross, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0D2E6E] text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Mobile Profile Image */}
        <Image
          src="/young-man.png" // Update this path to your profile image
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full lg:hidden"
        />

        {/* Brand */}
        <Link href={"/"} className="text-xl font-bold">
          MUB-VOTING
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
        </button>

        {/* Menu */}
        <div
          className={`absolute lg:relative top-full left-0 w-full lg:w-auto lg:flex lg:items-center lg:space-x-6 bg-[#0D2E6E] lg:bg-transparent ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 lg:space-y-0 lg:flex lg:flex-row lg:space-x-6 px-4 lg:px-0 py-4 lg:py-0">
            <li className="nav-item">
              <Link href="/about" className="hover:text-gray-300">
                ALL
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="hover:text-gray-300">
                KING
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="hover:text-gray-300">
                QUEEN
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="hover:text-gray-300">
                POPULAR
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="hover:text-gray-300">
                INNOCENT
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Profile Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <Image
            src="/young-man.png" // Update this path to your profile image
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
