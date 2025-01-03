"use client";
// import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import { links } from "@/config/link";
import Link from "next/link";
import { useState } from "react";
import { LogOut } from "lucide-react";
export default function Layout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <>
      <div className=" rounded-sm p-1 flex flex-wrap items-center justify-end">
        {/*  Profile Section */}
        <div className=" items-center space-x-4" onClick={toggleProfileMenu}>
          {user ? (
            <>
              <Image
                src={user.photoURL || "/young-man.png"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </>
          ) : (
            <Link href={links.login}>Login</Link>
          )}
          {/* Profile Dropdown */}
          {isProfileMenuOpen && user && (
            <div className="absolute right-0 top-14 bg-white text-black shadow-lg rounded-md w-48 p-3 z-[1000]">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-bold">{user.displayName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <ul className="mt-2 space-y-2">
                <li>
                  <button
                    onClick={logout}
                    className="w-full text-left text-sm text-red-500 hover:bg-gray-100 p-2 rounded"
                  >
                    <LogOut className="inline-block mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
