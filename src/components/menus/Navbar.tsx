"use client";
import Link from "next/link";
import Image from "next/image";
import { links } from "@/config/link";
import { conf } from "@/config";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#0D2E6E] text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 lg:px-8">
        <Image
          src={"/images/logo.png"}
          alt="LOGO"
          width={40}
          height={40}
          className="rounded-full lg:hidden"
        />

        {/* Brand */}
        <div className="flex items-center">
          <Image
            src={"/images/logo.png"}
            alt="LOGO"
            width={40}
            height={40}
            className="rounded-full hidden lg:block"
          />
          <Link href={"/"} className="text-lg font-bold text-yellow-400">
            MUB-VOTING
          </Link>
        </div>

        {/* Menu */}
        <div
          className={`hidden lg:block relative top-full left-0 w-full lg:w-auto lg:flex lg:items-center lg:space-x-6 bg-[#0D2E6E] lg:bg-transparent`}
        >
          <ul className="flex flex-row justify-center items-center gap-3 lg:space-y-0 lg:space-x-6 pt-2 lg:px-0 lg:py-0">
            {conf.menus.map((m, i) => (
              <li className="nav-item" key={i}>
                <Link
                  href={m.link}
                  className={`uppercase text-sm font-medium ${
                    isActive(m.link)
                      ? "text-yellow-400"
                      : "hover:text-gray-300 transition"
                  }`}
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*  Profile Section */}
        <DropdownMenu>
          {/* Trigger Button */}
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-4">
              {user ? (
                <Image
                  src={user.photoURL || "/young-man.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <Link href={links.login}>Login</Link>
              )}
            </button>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          {user && (
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="bg-white shadow-lg rounded-md w-48 p-3 z-[1000] text-black"
            >
              {/* User Info */}
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-bold">{user.displayName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      {/* Menu */}
      <div
        className={`relative top-full left-0 w-full lg:w-auto lg:flex lg:items-center lg:space-x-6 bg-[#0D2E6E] lg:bg-transparent`}
      >
        <ul className="block lg:hidden flex flex-row justify-center items-center gap-3 lg:space-y-0 lg:space-x-6 text-xs p-2 border-t-2 border-[#e5da0b] lg:px-0 lg:py-0">
          {conf.menus.map((m, i) => (
            <li className="nav-item" key={i}>
              <Link
                href={m.link}
                className={`uppercase text-sm font-medium ${
                  isActive(m.link)
                    ? "text-yellow-400"
                    : "hover:text-gray-300 transition"
                }`}
              >
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
