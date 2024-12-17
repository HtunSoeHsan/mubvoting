"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cross, LogIn, LogOut, Menu, Power, X } from "lucide-react";
// import { auth, signOut, signOutAction } from "@/service/auth.service";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { links } from "@/config/link";
import { ModeToggle } from "../cell/mode";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const data = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-[#0D2E6E] text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Mobile Profile Image */}
        {data.data?.user ? (
          <Image
            src={data.data?.user?.image || "/young-man.png"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full lg:hidden"
          />
        ) : (
          <Link href={links.login} className="lg:hidden">
            <Power />
          </Link>
        )}

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
            {data.data?.user && (
              <li className="nav-item">
                <LogOut
                  className="cursor-pointer hover:text-red-500 transition duration-200 lg:hidden"
                  onClick={() => signOut()}
                />
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Profile Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {data.data?.user ? (
            <>
              <Image
                src={data.data?.user?.image || "/young-man.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {data.data?.user?.name}
                </span>
                <span className="text-gray-400">{data.data?.user.role}</span>
              </div>
              <LogOut onClick={() => signOut()} />
            </>
          ) : (
            <Link href={links.login}>
              <Power>Login</Power>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
